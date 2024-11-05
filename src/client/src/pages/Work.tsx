const Work = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold">Work Experience</h1>
            <ol className="relative border-s border-purple-300 m-3 left-3 w-3/5">
                <Experience 
                    date="Jun 23 - Sep 24" 
                    title="Epic Systems | Software Developer" 
                    description={"Developed a high-usage ASP.NET item editor web app, improving productivity for 3,000+ developers by enabling faster, more efficient editing with a React/TypeScript interface, achieving 30% faster response times through optimized database queries and caching\n\nArchitected a high-availability reporting environment, reducing annual downtime by over 10 hours per instance via a robust replication system, and automated workflows to streamline the cutover process, ensuring business continuity during maintenance."} 
                />
                <Experience 
                    date="Jun 22 - Apr 23" 
                    title="2MinuteWarning | Software Developer" 
                    description="Designed and deployed a Python/Flask application that optimized data labeling workflows, enabling scalable task management and efficient onboarding of new labelers. Automated task distribution with AWS Lambda and SQS, significantly enhancing productivity. Built an end-to-end ML pipeline with AWS SageMaker, achieving over 90% accuracy on CNN/LSTM models for video labeling, elevating data quality and analysis." 
                />
                <Experience 
                    date="Mar 21 - Jun 21" 
                    title="AbbVie | Data Scientist" 
                    description="Developed an XGBoost model that accurately predicts adverse patient reactions to medication combinations with 85% accuracy. Conducted comprehensive feature selection from over 50 patient and medication variables, leveraging statistical tests, PCA, and clustering to reduce dimensionality and enhance predictive performance.." 
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
            <p className="text-base font-normal text-gray-500 dark:text-gray-400 whitespace-pre-line">{description}</p>
        </li>
    );
}



export default Work;