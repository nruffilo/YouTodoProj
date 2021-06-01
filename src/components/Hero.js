const Hero = ({ user, heroInfo, showCharacterSheet, setError}) => {
    
    const displayAvatar = () => {
        if (typeof(heroInfo.avatarurl) !== undefined && heroInfo.avatarurl !== '') {
            return <img alt='Character Hero Avatar' className='smallHeroImage' src={heroInfo.avatarurl}/>;
        } else {
            return '';
        }
    }

    const displayExp = () => {
        return heroInfo.experiencepoints + "/1000";
    }

    return (
        <div className={"heroDisplaySmall"}>
                {displayAvatar()}
            <span className={"heroSmallDisplayName"}>
            {heroInfo.displayname}
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