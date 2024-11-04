const Work = () => {
    return (
        <div className="">
            <h1 className="text-2xl">Work Experience</h1>
            <ol className="relative border-s border-purple-300 m-3 left-3">
                <Experience 
                    date="Jun 23 - Sep 24" 
                    title="Epic Systems | Software Developer" 
                    description="Get started with dozens of web components and interactive elements built on top of Tailwind CSS." 
                />
                <Experience 
                    date="Jun 22 - Apr 23" 
                    title="2MinuteWarning | Software Developer" 
                    description="Get started with dozens of web components and interactive elements built on top of Tailwind CSS." 
                />
                <Experience 
                    date="Mar 21 - Jun 21" 
                    title="AbbVie | Data Scientist" 
                    description="Get started with dozens of web components and interactive elements built on top of Tailwind CSS." 
                />
            </ol>
        </div>
    )
}

interface ExperienceProps{
    date : string;
    title : string;
    description: string;
}

const Experience = ({date,title,description} : ExperienceProps) => {
    return (                
        <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-purple-800 bg-purple-800"></div>
            <time className="mb-1 text-sm font-bold leading-none text-green-700 bg-green-200 p-1 rounded-lg">{date}</time>
            <h3 className="text-lg font-semibold text-black">{title}</h3>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">{description}</p>
        </li>
    );
}



export default Work;