import jobAnalyzerGIF from '../assets/jobAnalyzer.gif'
import santassignGIF from '../assets/santassign.gif'
import convez from '../assets/+convez.png'


const projectData = [
    {title: "AI JobAnalyzer", 
        gif: jobAnalyzerGIF,
        linkText: "View Source",
        link:"https://github.com/Jun-Li8/JobAnalyzer",
        description:"A tool for real-time job market insights, featuring AI-generated charts and analytics. Users can aggregate data from sources like Indeed and LinkedIn, then instantly uncover trends and patterns by asking direct questions about the dataset—ushering in a future where insights are just a question away. Say goodbye to Excel and Python Pandas."},
    {title: "Santassign",
        gif: santassignGIF,
        linkText: "Try it out",
        link:"https://santassign.web.app/",
        description: "A delightful Secret Santa app that spreads holiday cheer by automatically emailing Santa assignments to friends. Built on a serverless architecture with AWS Lambda for efficient, reliable email delivery, and a festive UI designed with React and SCSS to immerse users in the holiday spirit."},
    {title: "+Convez",
        gif: convez,
        linkText: "View Source",
        link:"https://github.com/Jun-Li8/Zoom-Bully-Detector",
        description: "A real-time monitoring application that captures live audio from Zoom sessions, transcribes it into text, and conducts sentiment analysis to detect potential bullying incidents. Upon detection, the tool automatically emails a detailed report to the meeting host, empowering proactive oversight and promoting a safer virtual environment."
    }
]

const Project = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold container mx-auto px-4 pt-4 font-serif">Projects</h1>
            {projectData.map((project) => (
                <TwoColumnLayout title={project.title} gif={project.gif} linkText={project.linkText} link={project.link} description={project.description}/>
            ))}
        </div>
    )
}

interface TwoColumnLayoutProp{
    title: string;
    gif: string;
    linkText: string;
    link: string;
    description: string;
}

const TwoColumnLayout = ({gif,description,link,linkText,title}: TwoColumnLayoutProp) => {
  return (
    <div className="container mx-auto px-4">
        <div className="flex flex-row gap-8 items-center min-h-[400px]">
            {/* Left Column - Description */}
            <div className="w-1/2 space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">
                {title}
            </h2>
            <p className="text-lg text-gray-600 flex flex-row">
                {description}
            </p>
            <a href={link}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded my-3">
                {linkText}
            </button>
            </a>
            </div>
            {/* Right Column - Image */}
            <div className="w-1/2">
            <div className="w-auto-[16] h-auto-[9] rounded-lg overflow-hidden">
                <img
                src={gif}
                alt="Job Analyzer GIF"
                className="object-cover"
                />
            </div>
            </div>
      </div>
    </div>
  );
};

export default Project;