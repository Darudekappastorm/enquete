module.exports = function(account) {
  return {
    id: account._id,
    username: account.username,
    username_lower: account.username_lower,
    email: account.email,
    creation_date: account.creation_date,
    access_levels: account.access_levels,
    verified: account.verified
  };
};
