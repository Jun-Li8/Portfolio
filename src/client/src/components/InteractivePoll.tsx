import React, { useState, useEffect,useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp } from 'lucide-react';
import {ILangData} from '../../../backend/src/model/Languages'


const API_URL = "http://localhost:3000"

//const colors = ["bg-green-500","bg-gray-500","bg-red-500","bg-yellow-500","bg-purple-500","bg-orange-500","bg-blue-500","bg-pink-500"];

const InteractivePoll = () => {
  // In a real app, this would come from MongoDB
  const [pollData, setPollData] = useState<ILangData[]>([])
  useEffect(() => {
      const fetchAllCollections = async () => {
          try{
              const response = await fetch(`${API_URL}/api/get-language-data`);
              const data = await response.json();
              setPollData(data.data);
          } catch (error){
              console.error('Error fetching collections:', error);
          }
      };
      fetchAllCollections();
  },[]);

  const [voted, setVoted] = useState(false);

  const totalVotes = pollData.reduce((sum, item) => sum + item.vote, 0);

  const updateVoteDB = async (opt: string, newVoteNum: number) => {
    try{
      await fetch(`${API_URL}/api/update-language-data`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({opt,newVoteNum}),
    });
    }catch(error){
      console.error('Error Updating vote count on Database: ', error);
    }
  }

  const handleVote = async (index : number) => {
    if (!voted) {
      setPollData(() => {
        const newData = pollData.map((item, i) => 
          i === index ? { ...item, vote: item.vote + 1 } : item);
        const opt = newData[index].option;
        const newVoteNum = newData[index].vote;
        updateVoteDB(opt,newVoteNum);
        return newData
      });
      setVoted(true);
    }
  };

  const maxVotes = Math.max(...pollData.map(item => item.vote));

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">What's your favorite programming language?</CardTitle>
        <p className="text-gray-500">Total votes: {totalVotes}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pollData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{item.option}</span>
                <span className="text-sm text-gray-500">
                  {item.vote} votes ({((item.vote / totalVotes) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item["color"]} transition-all duration-500`}
                    style={{
                      width: `${(item.vote / maxVotes) * 100}%`
                    }}
                  />
                </div>
                <Button
                  onClick={() => handleVote(index)}
                  disabled={voted}
                  variant="outline"
                  size="sm"
                  className="min-w-24"
                >
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  {voted ? 'Voted' : 'Vote'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractivePoll;