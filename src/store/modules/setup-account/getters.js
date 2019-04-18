export const updatedProfile = (state) => {
  const result = {
    ...state.name && { name: state.name },
    ...state.username && { username: state.username },
    ...state.aliases && { aliases: state.aliases }
  }
  return result
}
