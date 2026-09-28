// Khai báo quan hệ giữa các model (đặt riêng để tránh require vòng)
const { UserRole } = require('./userRole.model');
const { UserAccount } = require('./userAccount.model');
const { UserProfile } = require('./userProfile.model');
const { RefreshToken } = require('./refreshToken.model');
 
UserRole.hasMany(UserAccount, { foreignKey: 'role_id', as: 'accounts' });
UserAccount.belongsTo(UserRole, { foreignKey: 'role_id', as: 'role' });
 
UserAccount.hasOne(UserProfile, { foreignKey: 'user_account_id', as: 'profile', onDelete: 'CASCADE' });
UserProfile.belongsTo(UserAccount, { foreignKey: 'user_account_id', as: 'account' });
 
UserAccount.hasMany(RefreshToken, { foreignKey: 'user_account_id', as: 'refreshTokens', onDelete: 'CASCADE' });
RefreshToken.belongsTo(UserAccount, { foreignKey: 'user_account_id', as: 'account' });
 
module.exports = {
  ...require('./userRole'),
  ...require('./userAccount'),
  ...require('./userProfile'),
  ...require('./refreshToken'),
};