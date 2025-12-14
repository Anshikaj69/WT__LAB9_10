import React, { useState } from "react";
import { Sparkles, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { generateExperienceBullets } from "@/Services/AiModel";
import { updateThisResume } from "@/Services/resumeAPI";

const prompt =
  "Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format";
function Summary({ resumeInfo, enanbledNext, enanbledPrev }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // Declare the undeclared variable using useState
  const [summary, setSummary] = useState(resumeInfo?.summary || ""); // Declare the undeclared variable using useState
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState(null); // Declare the undeclared variable using useState
  const { resume_id } = useParams();

  const handleInputChange = (e) => {
    enanbledNext(false);
    enanbledPrev(false);
    dispatch(
      addResumeData({
        ...resumeInfo,
        [e.target.name]: e.target.value,
      })
    );
    setSummary(e.target.value);
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Started Saving Summary");
    const data = {
      data: { summary },
    };
    if (resume_id) {
      updateThisResume(resume_id, data)
        .then((data) => {
          toast("Resume Updated", "success");
        })
        .catch((error) => {
          toast("Error updating resume", `${error.message}`);
        })
        .finally(() => {
          enanbledNext(true);
          enanbledPrev(true);
          setLoading(false);
        });
    }
  }; // Declare the undeclared variable using useState

  const setSummery = (summary) => {
    dispatch(
      addResumeData({
        ...resumeInfo,
        summary: summary,
      })
    );
    setSummary(summary);
  };

const GenerateSummeryFromAI = async () => {
  if (!resumeInfo?.jobTitle) {
    toast("Please Add Job Title");
    return;
  }

  setLoading(true);

  try {
    const resp = await generateExperienceBullets(resumeInfo.jobTitle);

    // resp is already JSON
    setAiGenerateSummeryList(resp.experience || []);
    toast("Summary Generated");
  } catch (error) {
    console.error(error);
    toast("Failed to generate summary");
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              variant="outline"
              onClick={() => GenerateSummeryFromAI()}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
            >
              <Sparkles className="h-4 w-4" /> Generate from AI
            </Button>
          </div>
          <Textarea
            name="summary"
            className="mt-5"
            required
            value={summary ? summary : resumeInfo?.summary}
            onChange={handleInputChange}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

{aiGeneratedSummeryList?.length > 0 && (
  <div className="my-5">
    <h2 className="font-bold text-lg">Suggestions</h2>
    <ul className="list-disc list-inside">
      {aiGeneratedSummeryList.map((item, index) => (
        <div
          key={index}
          className="p-2 cursor-pointer hover:bg-gray-100 rounded"
          onClick={() => {
            enanbledNext(false);
            enanbledPrev(false);
            setSummery(item.replace(/<li>|<\/li>/g, "")); // remove <li> tags for textarea
          }}
          dangerouslySetInnerHTML={{ __html: item }}
        />
      ))}
    </ul>
  </div>
)}


    </div>
  );
}

export default Summary;
