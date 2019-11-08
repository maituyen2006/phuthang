    import { AdminRole } from './admin-role';
    import { Company } from './company';

    export class Admin {
        id?: number;
        urlAvatar?: string;
        username?: string;
        password?: string;
        name?: string;
        isDeleted?: boolean;
        isActive?: boolean;
        adminRoleId?: AdminRole;
        companyID?: Company;
        isManager?: boolean;
        adminID?: Admin;
        gender?: number;
        phone?: string;
        iNF_PlaceOfBirth?: string;
        iNF_DateOfBirth?: string;
        iNF_Country?: string;
        iNF_Nation?: string;
        iNF_SourceNation?: string;
        iNF_AddressReg?: string;
        iNF_Address?: string;
        iNF_BankName?: string;
        iNF_BankAccount?: string;
        adminCode?: string;
        createdDate?: Date;
    }
