import { useEffect, useState } from "react";
import { stories } from "./data/stories";
import clsx from "clsx";

function App() {
  const [storyId, setStoryId] = useState(null);
  const [allStories] = useState(stories);
  const [viewed, setViewed] = useState([]);
  const selectedStory = allStories.find((s) => s.id === storyId);
  const [showStory, setShowStory] = useState(false);

  useEffect(() => {
    if (!selectedStory) return;
    setShowStory(false);
    const delay = setTimeout(() => setShowStory(true), 50);
    setViewed((prev) =>
      prev.includes(selectedStory.id) ? prev : [...prev, selectedStory.id]
    );
    return () => clearTimeout(delay);
  }, [storyId]);

  useEffect(() => {
    if (!selectedStory) return;
    const timer = setTimeout(() => {
      handleNext();
    }, 5000);
    return () => clearTimeout(timer);
  }, [selectedStory]);

  const handlePrevious = () => {
    const currentIndex = allStories.findIndex((s) => s.id === storyId);
    if (currentIndex > 0) {
      setStoryId(allStories[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    const currentIndex = allStories.findIndex((s) => s.id === storyId);
    if (currentIndex < allStories.length - 1) {
      setStoryId(allStories[currentIndex + 1].id);
    } else {
      setStoryId(null);
    }
  };

  return (
    <main className="w-full h-screen relative overflow-hidden">
      <div className="bg-gray-100 p-2 w-full items-center storyDiv whitespace-nowrap overflow-x-auto overflow-y-hidden">
        {selectedStory && (
          <div
            className={clsx(
              "absolute left-0 top-14 w-full h-full bg-center bg-cover transition-opacity duration-500",
              showStory ? "opacity-100" : "opacity-0"
            )}>
            <img
              src={selectedStory.img}
              alt=""
              className="w-full h-full object-cover"
            />
            <button
              className="absolute left-4 top-0 h-screen w-10"
              onClick={handlePrevious}></button>
            <button
              className="absolute right-4 top-0 h-screen w-10"
              onClick={handleNext}></button>
          </div>
        )}

        {stories.map((story) => (
          <div
            key={story.id}
            onClick={() => setStoryId(story.id)}
            className={clsx(
              "size-10 mr-2 inline-block cursor-pointer rounded-full border-[1.5px]",
              story.id === storyId
                ? "border-blue-500"
                : viewed.includes(story.id)
                ? "border-gray-200"
                : "border-red-500"
            )}>
            <img
              src={story.img}
              alt={`Story ${story.id}`}
              className="rounded-full object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
