import LikesSection from "@/components/likes/LikeSection";

const Likes = () => {
  return (
    <div className="size-full lg:pt-14 pt-0 bg-[#F3F4F8] lg:px-10 px-0 flex flex-col items-start justify-start gap-6">
      <h1 className="hidden lg:block font-poppins text-[34px] font-bold">
        Likes
      </h1>
      <div className="w-full flex-grow lg:flex-grow h-[calc(100vh-60px)] flex items-center justify-center">
        <LikesSection />
      </div>
    </div>
  );
};

export default Likes;
