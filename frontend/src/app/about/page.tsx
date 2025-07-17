import AboutHeader from "@/components/about/AboutHeader";
import Founders from "@/components/about/Founders";
import Teams from "@/components/about/Teams";
import Vision from "@/components/about/Vision";
import Stats from "@/components/home/Stats";


const About = () => {
    return(
        <div>
           <AboutHeader />
           <Stats />
           <div className="mt-10">
            <Founders />
           </div>
           <Vision />
           <Teams />
        </div>
    )
}

export default About;