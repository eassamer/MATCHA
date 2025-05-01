import RecentMessages from "@/components/messages/recent-messages";
import ProfileCard from "@/components/profile/profile-card";

const Profile = () => {
  return (
    <div className="size-full lg:pt-14 pt-0 bg-[#F3F4F8] lg:px-10 px-0 flex flex-col items-start justify-start gap-6">
      <h1 className="hidden lg:block font-poppins text-[34px] font-bold">
        Profile
      </h1>
      <div className="w-full lg:max-h-[calc(100vh-60px)]  h-[calc(100vh-60px)] lg:h-[80%] flex-grow lg:flex-grow  flex items-center justify-between">
        <div className="custom:hidden lg:max-h-[86vh] lg:flex hidden w-[300px] h-[90%] bg-white rounded-[12.6px]">
          <RecentMessages />
        </div>
        <div className="custom:w-full w-full overflow-hidden lg:w-[calc(100%-330px)] lg:max-h-[86vh] h-[calc(100vh-60px)] lg:h-[90%] flex flex-col items-center justify-between lg:justify-center lg:py-0  lg:gap-6 bg-white  rounded-0 lg:rounded-[12.6px]">
          <ProfileCard />
        </div>
      </div>
    </div>
  );
};

export default Profile;
