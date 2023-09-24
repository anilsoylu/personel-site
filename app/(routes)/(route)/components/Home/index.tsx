import { SocialMediaList } from "../SocialMediaList"

const Home = async () => {
  return (
    <div className="row">
      <div className="p-6 lg:p-10 border rounded-md bg-blue/5 border-blue/30">
        <h2 className="text-xl lg:text-4xl font-bold lg:leading-[46px] ">
          Web Sayfama
          <br />
          Hoşgeldin!
        </h2>
        <div className="text-[15px] lg:text-lg text-light/60 py-4">
          Bu sitede yaptığım işleri, gündelik yaşantımdan sevdiğim şeyleri hobi
          olarak paylaşmak istiyorum..
          <SocialMediaList />
        </div>
      </div>
    </div>
  )
}

export default Home
