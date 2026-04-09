import { ListAllHackathonsData, GetUserTeamAndProjectsData, GetUserTeamAndProjectsVariables, CreateNewProjectData, CreateNewProjectVariables, PostAnnouncementData, PostAnnouncementVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useListAllHackathons(options?: useDataConnectQueryOptions<ListAllHackathonsData>): UseDataConnectQueryResult<ListAllHackathonsData, undefined>;
export function useListAllHackathons(dc: DataConnect, options?: useDataConnectQueryOptions<ListAllHackathonsData>): UseDataConnectQueryResult<ListAllHackathonsData, undefined>;

export function useGetUserTeamAndProjects(vars: GetUserTeamAndProjectsVariables, options?: useDataConnectQueryOptions<GetUserTeamAndProjectsData>): UseDataConnectQueryResult<GetUserTeamAndProjectsData, GetUserTeamAndProjectsVariables>;
export function useGetUserTeamAndProjects(dc: DataConnect, vars: GetUserTeamAndProjectsVariables, options?: useDataConnectQueryOptions<GetUserTeamAndProjectsData>): UseDataConnectQueryResult<GetUserTeamAndProjectsData, GetUserTeamAndProjectsVariables>;

export function useCreateNewProject(options?: useDataConnectMutationOptions<CreateNewProjectData, FirebaseError, CreateNewProjectVariables>): UseDataConnectMutationResult<CreateNewProjectData, CreateNewProjectVariables>;
export function useCreateNewProject(dc: DataConnect, options?: useDataConnectMutationOptions<CreateNewProjectData, FirebaseError, CreateNewProjectVariables>): UseDataConnectMutationResult<CreateNewProjectData, CreateNewProjectVariables>;

export function usePostAnnouncement(options?: useDataConnectMutationOptions<PostAnnouncementData, FirebaseError, PostAnnouncementVariables>): UseDataConnectMutationResult<PostAnnouncementData, PostAnnouncementVariables>;
export function usePostAnnouncement(dc: DataConnect, options?: useDataConnectMutationOptions<PostAnnouncementData, FirebaseError, PostAnnouncementVariables>): UseDataConnectMutationResult<PostAnnouncementData, PostAnnouncementVariables>;
