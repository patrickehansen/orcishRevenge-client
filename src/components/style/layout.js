export default (theme) => ({
  horizontalFlex: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  },
  verticalFlex: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
  },
  fixed: {
    flexGrow: 0,
  },
  grow: {
    flexGrow: 1,
  },
  spaceBetween: {
    justifyContent: 'space-between'
  }
});