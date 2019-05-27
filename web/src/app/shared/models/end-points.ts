import { Modules } from './modules';

export class EndPoints {
    /* Authentication module */
    public static readonly AUTH_LOGIN = `${Modules.AUTH}/auth/login`;
    public static readonly AUTH_LOGOUT = `${Modules.AUTH}/auth/logout`;
    public static readonly AUTH_REFRESHTOKEN = `${Modules.AUTH}/auth/refreshtoken`;

    /* Project Formulation module */
    public static readonly PROJECT_FORMULATION_COUNTRIES = `${Modules.PROJECT_FORMULATION}/countries`;
    public static readonly PROJECT_FORMULATION_AREAS = `${Modules.PROJECT_FORMULATION}/areas`;
    public static readonly PROJECT_FORMULATION_STRATEGICOBJECTIVES = `${Modules.PROJECT_FORMULATION}/strategicobjectives`;
    public static readonly PROJECT_FORMULATION_PROJECTTYPES = `${Modules.PROJECT_FORMULATION}/projecttypes`;
    public static readonly PROJECT_FORMULATION_TYPEOFPROJECTS = `${Modules.PROJECT_FORMULATION}/typeofprojects`;
    public static readonly PROJECT_FORMULATION_REGIONS = `${Modules.PROJECT_FORMULATION}/regions`;
    public static readonly PROJECT_FORMULATION_PROJECTS = `${Modules.PROJECT_FORMULATION}/projects`;

    /* ProDoc module */
    public static readonly PRODOC_BUDGETS = `${Modules.PRODOC}/budgets`;
    public static readonly PRODOC_LEGALS = `${Modules.PRODOC}/legals`;
    public static readonly PRODOC_MONITORINGS = `${Modules.PRODOC}/monitorings`;
    public static readonly PRODOC_PROJECTOBJECTIVES = `${Modules.PRODOC}/projectobjectives`;
    public static readonly PRODOC_RESOURCES = `${Modules.PRODOC}/resources`;
    public static readonly PRODOC_CONTEXTS = `${Modules.PRODOC}/contexts`;
    public static readonly PRODOC_SCHEDULES = `${Modules.PRODOC}/schedules`;

    /* Contact Management Modules */
    public static readonly CONTACT_MANAGEMENT_ENTITIES = `${Modules.CONTACT_MANAGEMENT}/entitys`;
     public static readonly CONTACT_MANAGEMENT_INDUSTRY_TYPES = `${EndPoints.CONTACT_MANAGEMENT_ENTITIES}/industrytypes`;
     public static readonly CONTACT_MANAGEMENT_ENTITY_TYPES = `${EndPoints.CONTACT_MANAGEMENT_ENTITIES}/entitytypes`;
    public static readonly CONTACT_MANAGEMENT_STAKEHOLDERS = `${Modules.CONTACT_MANAGEMENT}/stakeholders`;

    /// Tasks
    public static readonly TASK_SERVICE = `api/tasks`;
}
