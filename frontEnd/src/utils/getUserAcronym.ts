export const getUserAcronym = (user: string) => {
  const acronym = user?.includes(" ")
    ? (
      user?.split(" ")[0][0] +
      "" +
      user?.split(" ")[1][0]
    ).toUpperCase()
    : (
      user?.split(" ")[0][0] +
      "" +
      user?.split(" ")[0][1]
    ).toUpperCase();

  return acronym
}
