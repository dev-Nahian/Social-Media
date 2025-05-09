import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [post, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    setLoading(true);
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );
        setUser(response?.data.user);
        setPosts(response?.data.posts);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Fetching your profile data....</div>;
  }

  return (
    <>
      <div>
        Welcome, {user?.firstName} {""} {user?.lastName}
        <p>You Have {post.length} Posts.</p>
      </div>

      <main className="mx-auto max-w-[1020px] py-8">
        <div className="container">
          <div className="flex flex-col items-center py-8 text-center">
            <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
              <img
                className="max-w-full"
                src="./assets/images/avatars/avatar_1.png"
                alt="sumit saha"
              />

              <button className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80">
                <img src="./assets/icons/edit.svg" alt="Edit" />
              </button>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
                Sumit Saha
              </h3>
              <p className="leading-[231%] lg:text-lg">sumitsaha@gmail.com</p>
            </div>

            <div className="mt-4 flex items-start gap-2 lg:mt-6">
              <div className="flex-1">
                <p className="leading-[188%] text-gray-400 lg:text-lg">
                  Sumit is an entrepreneurial visionary known for his
                  exceptional performance and passion for technology and
                  business. He established Analyzen in 2008 while he was a
                  student at Bangladesh University of Engineering & Technology
                  (BUET). Analyzen has since become a top-tier Web and Mobile
                  Application Development firm and the first Digital and Social
                  Media Marketing Agency in Bangladesh.
                </p>
              </div>

              <button className="flex-center h-7 w-7 rounded-full">
                <img src="./assets/icons/edit.svg" alt="Edit" />
              </button>
            </div>
            <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
          </div>

          <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>

          <article className="card mt-6 lg:mt-8">
            <header className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                  src="./assets/images/avatars/avatar_1.png"
                  alt="avatar"
                />
                <div>
                  <h6 className="text-lg lg:text-xl">Sumit Saha</h6>
                  <div className="flex items-center gap-1.5">
                    <img src="./assets/icons/time.svg" alt="time" />
                    <span className="text-sm text-gray-400 lg:text-base">
                      12 min ago
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <button>
                  <img src="./assets/icons/3dots.svg" alt="3dots of Action" />
                </button>

                <div className="action-modal-container">
                  <button className="action-menu-item hover:text-lwsGreen">
                    <img src="./assets/icons/edit.svg" alt="Edit" />
                    Edit
                  </button>
                  <button className="action-menu-item hover:text-red-500">
                    <img src="./assets/icons/delete.svg" alt="Delete" />
                    Delete
                  </button>
                </div>
              </div>
            </header>

            <div className="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl">
              <div className="flex items-center justify-center overflow-hidden">
                <img
                  className="max-w-full"
                  src="./assets/images/poster.png"
                  alt="poster"
                />
              </div>
              <p>
                Grateful for the incredible experience of serving as the
                President of the Grand Jury board for this year's Digital
                Marketing Award organized by Bangladesh Brand Forum. Judging the
                best digital marketing campaigns was not just a responsibility
                but a journey of appreciation for innovation and creativity. The
                judging process, ensuring transparency, brought to light so many
                beautiful campaigns. Cheers to the dynamic world of digital
                marketing! sdfasd asdca sdfa sdca sdfa
              </p>
            </div>

            <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
              <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
                <img src="./assets/icons/like.svg" alt="Like" />
                <span>Like</span>
              </button>

              <button className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm">
                <img src="./assets/icons/comment.svg" alt="Comment" />
                <span>Comment(2)</span>
              </button>

              <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
                <img src="./assets/icons/share.svg" alt="Share" />
                <span>Share</span>
              </button>
            </div>

            <div>
              <div className="flex-center mb-3 gap-2 lg:gap-4">
                <img
                  className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
                  src="./assets/images/avatars/avatar_1.png"
                  alt="avatar"
                />

                <div className="flex-1">
                  <input
                    type="text"
                    className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
                    name="post"
                    id="post"
                    placeholder="What's on your mind?"
                  />
                </div>
              </div>

              <div className="mt-4">
                <button className="text-gray-300 max-md:text-sm">
                  All Comment ▾
                </button>
              </div>

              <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
                <div className="flex items-center gap-3 pt-4">
                  <img
                    className="max-w-6 max-h-6 rounded-full"
                    src="./assets/images/avatars/avatar_2.png"
                    alt="avatar"
                  />
                  <div>
                    <div className="flex gap-1 text-xs lg:text-sm">
                      <span>Tapas Adhikari: </span>
                      <span>Great Sumit Saha dada ❤</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <img
                    className="max-w-6 max-h-6 rounded-full"
                    src="./assets/images/avatars/avatar_1.png"
                    alt="avatar"
                  />
                  <div>
                    <div className="flex gap-1 text-xs lg:text-sm">
                      <span>Sumit Saha: </span>
                      <span>Great Sumit Saha dada ❤</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className="card mt-6 lg:mt-8">
            <header className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                  src="./assets/images/avatars/avatar_1.png"
                  alt="avatar"
                />
                <div>
                  <h6 className="text-lg lg:text-xl">Sumit Saha</h6>
                  <div className="flex items-center gap-1.5">
                    <img src="./assets/icons/time.svg" alt="time" />
                    <span className="text-sm text-gray-400 lg:text-base">
                      12 min ago
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <button>
                  <img src="./assets/icons/3dots.svg" alt="3dots of Action" />
                </button>

                <div className="action-modal-container hidden">
                  <button className="action-menu-item hover:text-lwsGreen">
                    <img src="./assets/icons/edit.svg" alt="Edit" />
                    Edit
                  </button>
                  <button className="action-menu-item hover:text-red-500">
                    <img src="./assets/icons/delete.svg" alt="Delete" />
                    Delete
                  </button>
                </div>
              </div>
            </header>

            <div className="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl">
              <div className="flex items-center justify-center overflow-hidden">
                <img
                  className="max-w-full"
                  src="./assets/images/poster.png"
                  alt="poster"
                />
              </div>
            </div>

            <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
              <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
                <img src="./assets/icons/like.svg" alt="Like" />
                <span>Like</span>
              </button>

              <button className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm">
                <img src="./assets/icons/comment.svg" alt="Comment" />
                <span>Comment(2)</span>
              </button>

              <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
                <img src="./assets/icons/share.svg" alt="Share" />
                <span>Share</span>
              </button>
            </div>

            <div>
              <div className="flex-center mb-3 gap-2 lg:gap-4">
                <img
                  className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
                  src="./assets/images/avatars/avatar_1.png"
                  alt="avatar"
                />

                <div className="flex-1">
                  <input
                    type="text"
                    className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
                    name="post"
                    id="post"
                    placeholder="What's on your mind?"
                  />
                </div>
              </div>

              <div className="mt-4">
                <button className="text-gray-300 max-md:text-sm">
                  All Comment ▾
                </button>
              </div>

              <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
                <div className="flex items-center gap-3 pt-4">
                  <img
                    className="max-w-6 max-h-6 rounded-full"
                    src="./assets/images/avatars/avatar_2.png"
                    alt="avatar"
                  />
                  <div>
                    <div className="flex gap-1 text-xs lg:text-sm">
                      <span>Tapas Adhikari: </span>
                      <span>Great Sumit Saha dada ❤</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <img
                    className="max-w-6 max-h-6 rounded-full"
                    src="./assets/images/avatars/avatar_1.png"
                    alt="avatar"
                  />
                  <div>
                    <div className="flex gap-1 text-xs lg:text-sm">
                      <span>Sumit Saha: </span>
                      <span>Great Sumit Saha dada ❤</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>   
      </main>
    </>
  );
};

export default ProfilePage;
