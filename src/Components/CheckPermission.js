
export async function UserPermission (UserPermissionsList){
 const requestPermission = async () => {

  return(UserPermissionsList)
 };

 return (
   requestPermission().then(res => {

    return res
   }));
}
