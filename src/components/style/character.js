export default (theme) => ({
  characterCard: {
    color: theme.palette.common.white,
    textShadow: theme.shadow.textShadow,
    minHeight: '17rem',
    cursor: 'pointer',
    margin: theme.spacing(1),
  },
  characterAvatar: {
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadow.textShadow,
    maxWidth: '20rem',
    maxHeight: '20rem',
  },

  sheetControls: {
    maxWidth: '5rem',
    position: 'relative',
    left: '0.5rem',
    bottom: '0.6rem',
  },

  characterCreator: {
    width: '85%',
    height: '85%',
    margin: 'auto',
    marginTop: '5%',
    borderRadius: theme.spacing(1),
    padding: theme.spacing(4),
  },

  characterBasicInfo: {
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.background.transparentGray,
    width: '60%',
    borderRadius: theme.spacing(1),
    float: 'left',
    padding: 0,
  },

  characterHeader: {
    width: '100%',
    height: theme.spacing(20),
    padding: 0,
    margin: 0,
    maxWidth: '100%',
  },

  characterName: {
    '& label': {
      color: theme.palette.primary.main,
      textShadow: theme.shadow.whiteText,
      paddingLeft: theme.spacing(2),
      fontSize: '1.2rem',
    },

    '& div': {
      fontWeight: 600,
      color: theme.palette.common.black,
      paddingLeft: theme.spacing(3),
      fontSize: '1.2rem',
    },

    '& input': {
      fontWeight: 600,
      color: theme.palette.common.black,
      textShadow: theme.shadow.whiteText,
      paddingLeft: theme.spacing(3),
      fontSize: '1.2rem',
      userSelect: 'none',
    },
  },

  characterCreationForm: {
    backgroundColor: theme.palette.background.transparentGray,
    borderRadius: theme.spacing(1),
    height: '100%',
    width: '100%',
    padding: theme.spacing(2),
  },

  avatarPlaceholder: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    float: 'left',
    marginRight: theme.spacing(4),
    cursor: 'pointer',
  },

  statsAssignment: {
    padding: 0,
    backgroundColor: theme.palette.background.transparentGray,
    width: '16rem',
    borderRadius: theme.spacing(1),
  },

  statList: {
    padding: 0,
    paddingTop: theme.spacing(1),
    borderRadius: theme.spacing(1),
    textShadow: theme.shadow.textShadow,
  },

  statAdjuster: {
    display: 'flex',
    flexDirection: 'row',
    width: '14rem',
    textAlign: 'center',
    marginLeft: theme.spacing(4),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.background.transparentGray,
    border: 'solid 1px black',
    boxShadow: theme.shadow.textShadow,
    borderRadius: theme.spacing(0.5),
    color: theme.palette.common.white,
  },

  statAdjusterCompact: {
    display: 'flex',
    flexDirection: 'row',
    width: '14rem',
    textAlign: 'center',
    paddingTop: theme.spacing(0.25),
    paddingBottom: theme.spacing(0.25),
    marginLeft: theme.spacing(4),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginBottom: 0,
    backgroundColor: theme.palette.background.transparentGray,
    border: 'solid 1px black',
    boxShadow: theme.shadow.textShadow,
    borderRadius: theme.spacing(0.5),
    color: theme.palette.common.white,
  },

  statText: {
    margin: 'auto',
    marginLeft: theme.spacing(1),

    padding: 0,
    textAlign: 'left',
    flexGrow: 1,
  },

  statLabel: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: theme.spacing(5),
    borderRadius: theme.spacing(1),
    width: theme.spacing(13),
    height: theme.spacing(11),
    textAlign: 'center',
    marginTop: theme.spacing(1.5),
    lineHeight: theme.spacing(11),
    textShadow: theme.shadow.textShadow,
    userSelect: 'none',
  },

  statLabelCompact: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: theme.spacing(5),
    borderRadius: theme.spacing(1),
    width: theme.spacing(13),
    height: theme.spacing(11),
    textAlign: 'center',
    lineHeight: theme.spacing(11),
    textShadow: theme.shadow.textShadow,
    userSelect: 'none',
  },

  statValue: {
    margin: 'auto',
    float: 'right',
    color: theme.palette.common.black,
    boxShadow: `inset 1px 1px 3px ${theme.palette.common.dark}`,
    border: 'solid 2px black',
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    minWidth: theme.spacing(10),
    marginRight: theme.spacing(1),
    userSelect: 'none',
    textShadow: theme.shadow.whiteText,
    fontWeight: 600,
  },

  statFooter: {
    marginTop: theme.spacing(4),
    color: theme.palette.common.white,
    textAlign: 'right',
    marginRight: theme.spacing(4),
    paddingBottom: theme.spacing(3),
  },

  statModifier: {
    width: theme.spacing(6),
    height: theme.spacing(4),
    minHeight: theme.spacing(5),
    minWidth: 0,
  },

  remainingPoints: {
    fontSize: '1.5rem',
    padding: theme.spacing(2),
    color: theme.palette.common.black,
    border: 'solid 1px black',
    boxShadow: 'inset 2px 2px 2px black',
    backgroundColor: theme.palette.background.transparentGray,
    width: theme.spacing(4),
    height: theme.spacing(4),
    textAlign: 'center',
    margin: 'auto',
    userSelect: 'none',
    fontWeight: 600,
    textShadow: theme.shadow.whiteText,
  },

  physicalCharacteristics: {
    backgroundColor: theme.palette.background.transparentGray,
    color: theme.palette.common.white,
    minWidth: '13rem',
    maxWidth: '13rem',
    paddingLeft: theme.spacing(4),
  },

  characteristicSelect: {
    color: theme.palette.common.black,
    boxShadow: theme.shadow.boxShadow,
    textShadow: theme.shadow.whiteText,
    fontSize: '1.8rem',
    userSelect: 'none',

    '& label': {
      color: theme.palette.primary.main,
      textShadow: theme.shadow.whiteText,
      paddingLeft: theme.spacing(2),
      fontSize: '1.2rem',
    },

    '& div': {
      fontWeight: 600,
      color: theme.palette.common.black,
      paddingLeft: theme.spacing(3),
      fontSize: '1.2rem',
    },

    '& input': {
      fontWeight: 600,
      color: theme.palette.common.black,
      textShadow: theme.shadow.whiteText,
      paddingLeft: theme.spacing(3),
      fontSize: '1.2rem',
      userSelect: 'none',
    },
  },

  characterCloseButton: {
    float: 'right',
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    maxHeight: theme.spacing(8),
    paddingTop: theme.spacing(1),
    minWidth: theme.spacing(8),
    padding: theme.spacing(1),
    cursor: 'pointer',
    boxShadow: theme.shadow.textShadow,
  },

  RPLikes: {
    minWidth: '55%',
    backgroundColor: theme.palette.background.transparentGray,
  },

  RPTitle: {
    marginRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    maxWidth: '9rem',
  },

  RPDescription: {
    paddingLeft: theme.spacing(1),
    width: '78%',
  },

  characterSheet: {
    backgroundColor: theme.palette.background.solidGray,
    width: '80%',
    minWidth: '70rem',
    minHeight: '46rem',
    height: '80%',
    margin: 'auto',
    marginTop: theme.spacing(10),
    padding: theme.spacing(2),
  },

  physicalTraits: {
    backgroundColor: theme.palette.background.transparentGray,
    maxWidth: '30%',
    marginLeft: theme.spacing(2),
  },

  physicalTrait: {
    marginBottom: '0.2rem',
  },

  traitLabel: {
    borderBottom: 'solid 2px black',
    fontSize: '1.6rem',
    minWidth: '6rem',
    textShadow: theme.shadow.whiteText,
  },

  traitValue: {
    borderBottom: 'solid 2px black',
    marginLeft: theme.spacing(2),
    fontSize: '1.6rem',
    minWidth: theme.spacing(32),
    width: theme.spacing(55),
    textShadow: theme.shadow.whiteText,
  },

  characterSheetMain: {
    width: '100%',
    padding: theme.spacing(0),
  },

  characterSkills : {
    padding: 0,
    display: 'block',
    minHeight: '38rem',
    backgroundColor: theme.palette.background.transparentGray,
  },

  skillSection: {
    width: '99%',

    '& label' : {
      fontSize: '1.1rem',
    }
  },

  skillsHalf: {
    width: '50%',
    float: 'left',
    minHeight: '37.8rem',
    backgroundColor: theme.palette.background.transparentGray,
  },

  skill: {
    justifyContent: 'space-between',
    margin: '0.2rem',
    padding: '0.2rem',
    zIndex: 2,
  },

  skillbox: {
    backgroundColor: theme.palette.background.transparentGray,
    flexGrow: 20,
  },

  addSkillButton : {
    maxHeight: '1.3rem',
    padding: 0,
    zIndex: 1,
    marginLeft: '10%',
    width: '80%',
    marginTop: '0.1rem',
    marginBottom: '0.2rem',
    '& span' : {
      maxHeight: 'inherit',
    }
  },

  skillEditor: {
    width: '80%',
    height: '35%',
    marginTop: '15%',
    backgroundColor: theme.palette.background.default
  },

  skillNotes: {
    marginTop: '0.1rem',
    maxHeight: '10rem',
  },

  skillSectionDelete: {
    zIndex: 20,
    position: 'absolute',
    top: '-0.9rem',
    right: '0rem',
    maxWidth: '1.3rem',
    minWidth: '0.3rem',
    maxHeight: '1.9rem',
    backgroundColor: theme.palette.error.main,
    padding: '0.1rem',

    // '& svg' : {
    //   height: '1.2rem',
    //   filter: 'drop-shadow(1px 1px 1px rgba(155,155,155,0.5)',
    // },
    '&:hover' : {
      backgroundColor: 'red'
    }
  }
});
