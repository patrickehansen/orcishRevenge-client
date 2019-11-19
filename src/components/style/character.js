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
  characterSheet: {
    backgroundColor: theme.palette.background.menu,
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