--THIS IS SUPABASE SQL to be run in the SQL editor of Supabase.io for setting up your initial test project.

CREATE TABLE Epic (
  EpicId bigint generated by default as identity primary key,
  EpicName varchar NOT NULL,
  CreatedDate timestamp WITH time zone default timezone('utc'::text, now()) not null                                                        
);
  
CREATE TABLE Quest (
  QuestId bigint generated by default as identity primary key,
  QuestName varchar not null,
  QuestDescription varchar not null,
  Reward text not null,
  Size int4 not null,
  ParentQuestId int4 default null,
  QuestStatus int4 default 0 not null,
  CreatedDate timestamp WITH time zone default timezone('utc'::text, now()) not null,                                                   
  StartDate timestamp WITH time zone null,  
  CompletedDate timestamp WITH time zone null,  
  ExpireDate timestamp WITH time zone null,
  CreatedByUserId uuid references auth.users not null,
  FOREIGN KEY (ParentQuestId) REFERENCES Quest(QuestId)
);
  

CREATE TABLE UserQuest (
  UserQuestId bigint generated by default as identity primary key,
  QuestId int4 references Quest not null,
  user_id uuid references auth.users not null
);

CREATE TABLE Party (
  PartyId bigint generated by default as identity primary key,
  PartyName varchar not null,
  PartyType int4 default 1 not null,
  CreatedDate timestamp with time zone default timezone('utc'::text, now()) not null
);

CREATE TABLE UserParty (
  UserPartyId bigint generated by default as identity primary key,
  user_id uuid references auth.users not null,
  PartyId bigint references Party not null,
  RoleId int4 default 1 not null
);

CREATE TABLE PartyEpic (
  PartyEpicId bigint generated by default as identity primary key,
  PartyId int4 references Party not null,
  EpicId int4 references Epic not null
);

CREATE TABLE EpicQuest (
  EpicQuestId bigint generated by default as identity primary key,
  EpicId int4 references Epic not null,
  QuestId int4 references Quest not null
);

CREATE TABLE Reward (
  RewardId bigint generated by default as identity primary key,
  user_id uuid references auth.users not null,
  Reward text,
  RedemptionStatus int default 0,
  RedemptionDate timestampe default null
)

CREATE TABLE UserDetail (
  UserDetailId bigint generated by default as identity primary key,
  user_id uuid references auth.users not null,
  AvatarUrl varchar default null,
  DisplayName varchar default null,
  ExperiencePoints int8 default 0,
  level int default 0,
  Gold int default 0,
  AbilityPoints int default 0,
  CurrentHP int4 default 25,
  MaxHP int4 default 25,
  Defense int4 default 5,
  Strength int4 default 10,
  Magic int4 default 10
);

CREATE TABLE QuestTag (
  QuestTagId bigint generated by default as identity primary key,
  QuestId int4 references Quest not null,
  TagName varchar default null  
);



CREATE TABLE AdventureEnemy (
  AdventureEnemyId bigint generated by default as identity primary key,
  HP int default 10,
  Attack int default 0,
  Defense int default 0,
  Magic int default 0,
  Rewards varchar default null
);

CREATE TABLE Adventure (
  AdventureId bigint generated by default as identity primary key,
  AdventureName varchar default null,
  StartIndicator boolean default false, 
  AdventureType varchar default null,
  AdventureEnemyId bigint references AdventureEnemy null,
  Heading varchar default null,
  Story varchar default null,
  Rewards varchar default null,
  image varchar default null
);

CREATE TABLE AdventureAction (
  AdventureActionId bigint generated by default as identity primary key,
  OriginatingAdventureId bigint references Adventure(AdventureId) not null,
  RandomAction varchar default null,
  ActionText varchar default null,
  Conditions varchar default null,
  AdventureId bigint references Adventure default null
);

CREATE TABLE Encounter (
  EncounterId bigint generated by default as identity primary key,
  AdventureId bigint references Adventure,
  ActionAdeventureId bigint references Adventure(AdventureId) default null,
  EncounterText varchar default null,
  Rewards varchar default null
);

--- function for getting and creating hero information if it doesn't exist...
CREATE OR REPLACE FUNCTION GetHero()
RETURNS table(avatarurl varchar, displayname varchar, experiencepoints int4, myuserid uuid, "level" int8, "gold" int8, "abilityPoints" int8,"currentHP" int4, "maxHP" int4, "defense" int4, "strength" int4, "magic" int4)
AS $Body$
  DECLARE userId uuid;
begin
  userId = auth.uid();
  IF NOT EXISTS (SELECT user_id FROM userdetail ud WHERE ud.user_id = userId) THEN
    INSERT INTO userdetail
      (user_id, avatarurl, displayname, experiencepoints) VALUES (userId, '','New Hero',0);
  END IF;
  return 
    QUERY SELECT 
      ud.avatarurl, 
      ud.displayname, 
      ud.experiencepoints, 
      ud.user_id, 
      ud."Level", 
      ud."Gold", 
      ud."AbilityPoints",
      ud."CurrentHP",
      ud."MaxHP",
      ud."Defense",
      ud."Strength",
      ud."Magic"
    FROM 
      userdetail ud WHERE ud.user_id = userId;
END
$Body$
LANGUAGE plpgsql VOLATILE;

---


  
ALTER TABLE Quest ENABLE ROW LEVEL SECURITY;
ALTER TABLE UserQuest ENABLE ROW LEVEL SECURITY;
ALTER TABLE UserDetail ENABLE ROW LEVEL SECURITY;
ALTER TABLE Reward ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Individuals can create Quests" on quest FOR INSERT
	WITH CHECK (auth.uid() = CreatedByUserId);

CREATE POLICY "Individuals can update quests" ON Quest FOR UPDATE
  USING (((uid() = createdbyuserid) OR (questid IN ( SELECT userquest.questid FROM userquest WHERE (userquest.user_id = uid())))));

CREATE POLICY "Individuals can delete quests" ON Quest FOR DELETE
  USING (((uid() = createdbyuserid) OR (questid IN ( SELECT userquest.questid FROM userquest WHERE (userquest.user_id = uid())))));


CREATE POLICY "Individuals can Get Quests" on Quest FOR SELECT
	using (((uid() = createdbyuserid) OR (questid IN ( SELECT userquest.questid FROM userquest WHERE (userquest.user_id = uid())))));

--CREATE POLICY "Individuals can link quests" on UserQuest FOR ALL
--	WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Individuals can create/Update Rewards" on Reward FOR INSERT
	WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Individuals can create/Update Rewards" on Reward FOR UPDATE
	WITH CHECK (auth.uid() = user_id);


CREATE POLICY "Individuals can see their rewards" ON Reward FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Individuals can Get Rewards" on Reward FOR SELECT
	using (auth.uid() = user_id);


--create policy "Individuals can create todos." on todos for insert with check (auth.uid() = user_id);

--create policy "Individuals can view their own todos. " on todos for select using (auth.uid() = user_id);

--create policy "Individuals can update their own todos." on todos for update using (auth.uid() = user_id);

--create policy "Individuals can delete their own todos." on todos for delete using (auth.uid() = user_id);

create policy "Individuals can update their own user details." on userdetail for
    update using (auth.uid() = user_id);

create policy "Individuals can create user details." on userdetail for
    insert with check (auth.uid() = user_id);

create policy "everyone can view user details" on userdetail FOR
    select using (true);
	
--- STORED PROCEDURES TO MAKE CODING EASIER AND MORE LOGICAL
CREATE OR REPLACE FUNCTION AddNewQuest(questName text, questDescription text, reward text, questSize text, newQuestUserId uuid)
RETURNS integer
AS $Body$
  DECLARE newQuestId integer;
  DECLARE userId uuid;
  DECLARE questcheck integer;
begin
  userId = auth.uid();
  IF (newQuestUserId != userId) THEN
    --If attempting to create a quest for another user, check to make sure the creating user has the rights.
    SELECT count(userpartyid) INTO questcheck FROM userparty WHERE user_id = userid AND partyid IN (SELECT partyid FROM userparty WHERE user_id = newQuestUserId);
    IF (questcheck = 0) THEN
      RETURN 0;
    ELSE 
      INSERT INTO quest(questname, questdescription, queststatus, reward, size,createddate, createdbyuserid) 
        VALUES (questName, questDescription, 1, reward, cast(questSize as integer), current_date, userId) RETURNING questid INTO newQuestId;
      INSERT INTO userquest (user_id, questid) VALUES (newQuestUserId, NewQuestId);
      RETURN newQuestId;
    END IF;
  ELSE 
    INSERT INTO quest(questname, questdescription, queststatus, reward, size,createddate, createdbyuserid) 
      VALUES (questName, questDescription, 1, reward, cast(questSize as integer), current_date, userId) RETURNING questid INTO newQuestId;
    INSERT INTO userquest (user_id, questid) VALUES (newQuestUserId, NewQuestId);
    return NewQuestId;
  END IF;

end;
$Body$
LANGUAGE plpgsql VOLATILE;

--- Create Party
CREATE OR REPLACE FUNCTION CreateNewParty(PartyName text)
RETURNS integer
AS $Body$
  DECLARE newPartyId integer;
  DECLARE userId uuid;
begin
  userId = auth.uid();
  INSERT INTO Party(PartyName) VALUES (PartyName) RETURNING PartyId INTO newPartyId;
  INSERT INTO UserParty(user_id, PartyId, RoleId) VALUES (userId, newPartyId,3);
  return newPartyId;
end;
$Body$
LANGUAGE plpgsql VOLATILE;

--- Add Party Member
CREATE OR REPLACE FUNCTION AddPartyMember(insertpartyid int, newMemberText text)
RETURNS integer
AS $Body$
  DECLARE userId uuid;
  DECLARE userRoleId int4;
  DECLARE newUserId uuid;
  DECLARE userDisplayName text;
  DECLARE userChecksum text;
begin
  SELECT split_part(newMemberText,'#',1) as udn, split_part(newMemberText,'#',2) as ucs INTO userDisplayName, userChecksum;
  userId = auth.uid();
 
  -- check to see if the user is an admin of the party
  SELECT RoleId INTO userRoleId FROM UserParty WHERE userparty.PartyId = insertpartyid AND user_id = userId;
  IF LENGTH(userChecksum) < 4 THEN
    RETURN -1;
  END IF;
  -- get the USER of the email requested
  SELECT user_id INTO newUserId FROM userdetail WHERE displayname = userDisplayName AND user_id::text LIKE userChecksum || '%';
  IF (userRoleId = 3 AND newUserId IS NOT null) THEN 
    INSERT INTO UserParty(user_id, PartyId, RoleId) VALUES (newUserId, insertpartyid,1);
    RETURN 1;
  ELSE  
    RETURN -1;
  END IF;
end;
$Body$
LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION GetPartyAndUsers() 
RETURNS TABLE(partyId bigint, partyName varchar, partyUserId uuid, displayname varchar)
AS $Body$
  DECLARE userId uuid;
begin
  userId = auth.uid();
  return 
    QUERY SELECT 
            p.PartyId, p.PartyName, up.user_id, ud.displayname 
          FROM 
            UserParty up 
            LEFT JOIN Party p ON p.PartyId = up.PartyId
            LEFT JOIN userdetail ud ON ud.user_id = up.user_id
          WHERE up.PartyId IN (SELECT UserParty.PartyId FROM UserParty WHERE user_id = userId);
end;
$Body$
LANGUAGE plpgsql VOLATILE;

--level up
CREATE OR REPLACE FUNCTION CheckLevelUp(
  OUT leveledup int4,
  OUT newlevel int4,
  OUT abilityPointsReward int4,
  OUT goldRewards int4
)
AS $Body$
  DECLARE userId uuid;
  DECLARE usersXP int4;
  DECLARE currentLevel int4;
  DECLARE xpToLevel int8;
BEGIN
  --To level up, you need current level +1 * 1000.  So, to reach level 1, you need 1000, then 2000, etc.\
  userId = auth.uid();
  leveledup = 0;
  newlevel = 0;
  abilityPointsReward = 0;
  goldRewards = 0;
  SELECT experiencepoints, "Level" INTO usersXP, currentLevel FROM userdetail WHERE user_id = userId;
  xpToLevel = (currentLevel+1) * 1000;
  IF (usersXP > xpToLevel) THEN
    newLevel = currentLevel + 1;
    leveledup = 1;
    goldRewards = 100 + (25*newLevel);
    abilityPointsReward = 1;
    IF (MOD(newLevel, 10) = 0) THEN
      goldRewards = goldRewards + 500;
      abilityPointsReward = abilityPointsReward + 5;
    END IF; 
    UPDATE userdetail SET experiencepoints = experiencepoints - xpToLevel, "Level" = newLevel, "Gold" = "Gold" + goldRewards, "AbilityPoints" = "AbilityPoints" + abilityPointsReward WHERE user_id = userId;    
  END IF;
END;
$Body$
LANGUAGE plpgsql VOLATILE;

--- Create quest for party member
CREATE OR REPLACE FUNCTION CreateQuestForPartyMember(questName text, questDescription text, reward text, questSize text, targetUserId uuid)
RETURNS integer
AS $Body$
  DECLARE newQuestId integer;
  DECLARE userId uuid;
begin
  userId = auth.uid();
  --check to see if this is a party admin for the target user
  IF EXISTS (SELECT user_id FROM UserParty WHERE PartyId IN (SELECT PartyId FROM UserParty WHERE user_id = targetUserId) AND user_id = userId AND roleid = 3) THEN
    INSERT INTO quest(questname, questdescription, queststatus, reward, size,createddate, createdbyuserid) 
      VALUES (questName, questDescription, 1, reward, cast(questSize as integer), current_date, userId) RETURNING questid INTO newQuestId;
    INSERT INTO userquest (targetUserId, questid) VALUES (userId, NewQuestId);
    return NewQuestId;
  ELSE 
    return 0;
  END IF;
end;
$Body$
LANGUAGE plpgsql VOLATILE;
 
	
--- GET QUESTSc
CREATE OR REPLACE FUNCTION GetQuests()
RETURNS TABLE (questId int8, questname varchar, questdescription varchar, questatus int4, reward text, size int4, createddate timestamptz, completeddate timestamptz, expiredate timestamptz)
AS $Body$
  DECLARE userId uuid;
begin
  userId = auth.uid();
  return 
    QUERY SELECT 
            q.QuestId, q.questname, q.questdescription, q.queststatus, q.reward, q.size, q.createddate, q.completeddate, q.expiredate 
          FROM UserQuest uq LEFT JOIN Quest q ON q.questid = uq.questid 
          WHERE uq.user_id = userId AND q.queststatus = 1;
end;
$Body$
LANGUAGE plpgsql VOLATILE;

--UPDATE HERO STATS
CREATE OR REPLACE FUNCTION UpdateHeroStats(gold bigint, currenthp bigint, maxhp bigint, defense bigint, strength bigint, magic bigint)
RETURNS integer
AS $Body$
  DECLARE isSuccess integer;
  DECLARE userId uuid;
begin
  userId = auth.uid();
  --check to see if this is a party admin for the target user
  UPDATE userdetail 
    SET 
    "Gold" = gold,
    "CurrentHP" = currenthp,
    "MaxHP" = maxhp, 
    "Defense" = defense, 
    "Strength" = strength, 
    "Magic" = magic
  WHERE user_id = userId;
  RETURN 1;
end;
$Body$
LANGUAGE plpgsql VOLATILE;

	
--- COMPLETE QUEST
CREATE OR REPLACE FUNCTION completequest(completedquestid bigint)
RETURNS integer
AS $Body$
  DECLARE userId uuid;
  DECLARE QuestReward text;
  DECLARE QuestSize int;
  DECLARE xpValue int;
  DECLARE goldValue int;
begin
  userId = auth.uid();
  --Check to see if this quest ID is owned by this user
  IF EXISTS (SELECT questId FROM userquest WHERE questid = completedquestid AND user_id = userId) THEN
    SELECT reward, size INTO QuestReward, QuestSize FROM quest WHERE questid = completedquestid;
    UPDATE quest SET completeddate = current_date, queststatus = 2 WHERE questid = completedquestid;
    IF (QuestReward != '') THEN
      INSERT INTO reward (user_id, reward) VALUES (userId, QuestReward);
    END IF;
    CASE 
      WHEN QuestSize = 1 THEN xpValue = 100;
      WHEN QuestSize = 2 THEN xpValue = 400;
      WHEN QuestSize = 3 THEN xpValue = 1200;
      WHEN QuestSize = 4 THEN xpValue = 2500;
      ELSE xpValue = 0;
    END CASE;
    CASE 
      WHEN QuestSize = 1 THEN goldValue = 5;
      WHEN QuestSize = 2 THEN goldValue = 10;
      WHEN QuestSize = 3 THEN goldValue = 25;
      WHEN QuestSize = 4 THEN goldValue = 55;
      ELSE xpValue = 0;
    END CASE;
    UPDATE userdetail SET experiencepoints = experiencepoints + xpValue, "Gold" = "Gold" + goldValue WHERE user_id = userId;
  END IF;
  return 1;
END;
$Body$
LANGUAGE plpgsql VOLATILE;

--delete quest
CREATE OR REPLACE FUNCTION deletequest(deletedquestid int)
RETURNS integer
AS $Body$
  DECLARE userId uuid;
begin
  userId = auth.uid();
  --check to see if this is a party admin for the target user
  IF EXISTS (SELECT questid FROM userquest WHERE questid = deletedquestid AND user_id = userId) THEN
    DELETE FROM userquest WHERE questid = deletedquestid;
    DELETE FROM quest WHERE questid = deletedquestid;
    return 1;
  ELSE 
    return 0;
  END IF;
end;
$Body$
LANGUAGE plpgsql VOLATILE;


--Permissions for functions/stored proceedures to access the auth

GRANT EXECUTE ON FUNCTION deletequest(deletedquestid int) TO PUBLIC;
GRANT EXECUTE ON FUNCTION GetQuests() TO PUBLIC;
GRANT EXECUTE ON FUNCTION updateherostats(gold bigint, currenthp bigint, maxhp bigint, defense bigint, strength bigint, magic bigint) TO PUBLIC;
GRANT EXECUTE ON FUNCTION GetAdventure(findAdventureId int4) TO PUBLIC;
GRANT EXECUTE ON FUNCTION addnewquest(questName text, questDescription text, reward text, questSize text, newquestuserid uuid) TO PUBLIC;
GRANT EXECUTE ON FUNCTION checklevelup() to PUBLIC;
GRANT EXECUTE ON FUNCTION completequest(completedquestid bigint) TO PUBLIC;
GRANT EXECUTE ON FUNCTION createnewparty(partyname text) TO PUBLIC;
GRANT EXECUTE ON FUNCTION addpartymember(insertpartyid int, newmembertext text) TO PUBLIC;
GRANT EXECUTE ON FUNCTION createquestforpartymember(questname text, questdescription text, reward text, questsize text, targetuserid uuid)
GRANT EXECUTE ON FUNCTION GetPartyAndUsers() 


grant usage on schema auth to anon;
grant usage on schema auth to authenticated;

