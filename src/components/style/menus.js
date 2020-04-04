export default (theme) => ({
  gameRoot: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.common.black,
  },

  characterSelect: {
    padding: '0',
    width: '85%',
    height: '85%',
    margin: 'auto',
    marginTop: '5%',

    backgroundColor: '$lightGray',
    borderRadius: '4px',
  },
  characterContainer: {
    width: '97.5%',
    position: 'relative',
    right: '1rem',
    order: 0,

    margin: theme.spacing(8),
    marginBottom: 0,
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadow.boxShadow,
    padding: theme.spacing(8),
    backgroundColor: theme.palette.background.transparentGray,
  },
  styleUpdater: {
    width: '80%',
    height: '80%',
    margin: 'auto',
    backgroundColor: theme.palette.background.menu,
  },
  rightPane: {

  },
  menuColumn: {
    float: 'right',
    maxWidth: '2.5rem',
    position: 'sticky',
    right: '11.5rem',
    transition: 'all ease-in-out 500ms',
    '&:hover': {
      transition:'all ease 300ms',
      maxWidth: '4rem',
    }
  },

  menuColumnContainer: {

  },
  cardActive: {
    backgroundColor: theme.palette.secondary.main,
  },
  cardInactive: {
    backgroundColor: theme.palette.background.card,
  },
});
