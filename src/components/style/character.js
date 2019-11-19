export default (theme) => ({
  characterCard: {
    color: theme.palette.common.white,
    textShadow: theme.shadow.textShadow,
    minHeight: '17rem',
    cursor: 'pointer',
    margin: theme.spacing(1),
  },
  characterAvatar : {
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadow.textShadow,
    maxWidth: '20rem',
    maxHeight: '20rem',
  },

  characterCreator: {
    width: '85%',
    height: '85%',
    margin: 'auto',
    marginTop: '5%',
    borderRadius: theme.spacing(1),
    padding:  theme.spacing(4),
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
  },

  statValue: {
    margin: 'auto',
    float: 'right',
    color: theme.palette.common.black, 
    boxShadow: `inset 1px 1px 3px ${theme.palette.common.dark}`,
    border: 'solid 2px black',
    minWidth: theme.spacing(10),
    marginRight: theme.spacing(1),
  },

  statFooter: {
    marginTop: theme.spacing(4),
    color: theme.palette.common.white,
    textAlign: 'right',
    marginRight: theme.spacing(4),
    paddingBottom: theme.spacing(3),
  },

  statModifier : {
    width: theme.spacing(6),
    height: theme.spacing(4),
    minHeight: theme.spacing(5),
    minWidth: 0,
  },

  characterSheet: {
    backgroundColor: theme.palette.background.transparentGray,
    width: '80%',
    height: '80%',
    margin: 'auto',
    marginTop: theme.spacing(10),
    padding: theme.spacing(2),
  },

  characterSheetMain: {
    width: '100%',
    padding:  theme.spacing(0),
  },
});