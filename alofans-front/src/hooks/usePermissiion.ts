import { EnumUserType } from "@/enums/user";

const usePermission = (user: TypeUserResponse, permissionType: EnumUserType = EnumUserType.PROFESSIONAL) => {
   if (permissionType === EnumUserType.ADMIN && user.role === EnumUserType.ADMIN){
    return true;
   }
   if (permissionType === EnumUserType.PROFESSIONAL && (user.role === EnumUserType.ADMIN || user.role === EnumUserType.PROFESSIONAL)){
    return true;
   }
   return false
};

export default usePermission;

