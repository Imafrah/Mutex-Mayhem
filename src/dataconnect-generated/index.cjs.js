const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'cse2hackthon',
  location: 'us-west1'
};
exports.connectorConfig = connectorConfig;

const listAllHackathonsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllHackathons');
}
listAllHackathonsRef.operationName = 'ListAllHackathons';
exports.listAllHackathonsRef = listAllHackathonsRef;

exports.listAllHackathons = function listAllHackathons(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listAllHackathonsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getUserTeamAndProjectsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserTeamAndProjects', inputVars);
}
getUserTeamAndProjectsRef.operationName = 'GetUserTeamAndProjects';
exports.getUserTeamAndProjectsRef = getUserTeamAndProjectsRef;

exports.getUserTeamAndProjects = function getUserTeamAndProjects(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getUserTeamAndProjectsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const createNewProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewProject', inputVars);
}
createNewProjectRef.operationName = 'CreateNewProject';
exports.createNewProjectRef = createNewProjectRef;

exports.createNewProject = function createNewProject(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createNewProjectRef(dcInstance, inputVars));
}
;

const postAnnouncementRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'PostAnnouncement', inputVars);
}
postAnnouncementRef.operationName = 'PostAnnouncement';
exports.postAnnouncementRef = postAnnouncementRef;

exports.postAnnouncement = function postAnnouncement(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(postAnnouncementRef(dcInstance, inputVars));
}
;
