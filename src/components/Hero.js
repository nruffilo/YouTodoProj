const Hero = ({ user, heroInfo, showCharacterSheet, setError}) => {
    
    const displayAvatar = () => {
        if (typeof(heroInfo.avatarurl) !== undefined && heroInfo.avatarurl !== '') {
            return <img alt='Character Hero Avatar' className='smallHeroImage' src={heroInfo.avatarurl}/>;
        } else {
            return '';
        }
    }

    const displayExp = () => {
        let nextLevelXp = (heroInfo.Level+1)*1000;
        return (
        <div className={"heroXPDisplay"}>
            <div className={"heroCurrentXP"}>{heroInfo.experiencepoints}</div>
            <div className={"heroNextLevelXP"}>{nextLevelXp}</div>
        </div>)
    }

    return (
        <div className={"heroDisplaySmall"}>
                {displayAvatar()}
            <span className={"heroSmallDisplayName"}>
            {heroInfo.displayname}
            </span>
            <span className={"heroLevel"}>
                Lvl: {heroInfo.Level}
            </span>
            <span className={"heroSmallExperience"}>
                {displayExp()}
            </span>
            <button className={"heroSmallEditDetails"}
                onClick={showCharacterSheet}>
                ?
            </button>
        </div>    

    )

}

export default Hero;