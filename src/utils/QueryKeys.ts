/**
 * @format
 */
const QueryKeys = {
  contacts: 'contacts',
  contactDetails: 'contactDetails',
  sendEmail: 'sendEmail',
  getEmails: 'getEmails',
  sendSms: 'sendSms',
  leadStatus: 'leadStatus',
  contracts: 'contracts',
  getAllActivities: 'getAllActivities',
  allCounts: 'allCounts',
  contactsBySearch: 'contactsBySearch',
  userRoles: 'userRoles',
  activitiesType: 'activitiesType',
  dueToday: 'dueToday',
  allChats: 'allchats',
  allChatRoomPagination: 'allChatRoomPagination',
  getAllFolderData: 'getAllFolderData',
  allChatFiles: 'allChatFiles',
  chatBySearch: 'chatBySearch',
  sendChatMessage: 'sendChatMessage',
  unreadCount: 'unreadCount',
  onlineUsers: 'onlineUsers',
  onlineAdminAgentList: 'onlineAdminAgentList',
  onlineSalesAgentList: 'onlineSalesAgentList',
  onlineASAgentList: 'onlineASAgentList',
  groupMembers: 'groupMembers',
  chatReadInfo: 'chatReadInfo',
};

export type QueryKeysType = keyof typeof QueryKeys;

export {QueryKeys};
