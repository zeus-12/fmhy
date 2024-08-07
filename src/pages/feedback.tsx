import Link from "@/components/link";
import { Button, Select, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { NextSeo } from "next-seo";
import { useState } from "react";

const Feedback = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm({
    initialValues: {
      message: "",
      feedbackType: "",
      anonymous: false,
      contactEmail: "",
    },
    validate: {
      message: (value) => (value.length > 10 ? null : "Too short"),
      anonymous: (value) =>
        [true, false].includes(value) ? null : "Invalid value",
      feedbackType: (value) =>
        ["bug", "suggestion", "other", "appreciate"].includes(value)
          ? null
          : "Invalid value",
    },
  });

  const submitFeedbackHandler = async () => {
    setSuccess(false);
    setError(false);
    const validationResult = form.validate();

    if (Object.keys(validationResult.errors).length > 0) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form.values),
      });
      const data = await res.json();
      if (data.error) {
        setError(true);
        setLoading(false);
        return;
      }
    } catch (err) {
      setError(true);
      setLoading(false);
      return;
    }
    setLoading(false);
    setSuccess(true);
    form.reset();
  };

  return (
    <>
      <NextSeo title="Feedback" description="Feedback for fmhy.vercel.app" />

      <div className="flex h-full flex-1 flex-col items-center gap-2 sm:justify-center">
        <p className="pt-4 text-4xl font-bold">
          Submit <span className="text-rose-400">Feedback</span>!
        </p>
        <p className="-mt-2 text-gray-400">
          Help us make the site even better🥳
        </p>

        <Select
          className="w-[90vw] max-w-[30rem]"
          label="Feedback Type"
          placeholder="Feedback Type"
          data={[
            { value: "bug", label: "Bug" },
            { value: "suggestion", label: "Suggestion" },
            { value: "other", label: "Other" },
            { value: "appreciate", label: "Appreciate" },
          ]}
          {...form.getInputProps("feedbackType")}
        />

        <Textarea
          required={true}
          className="w-[90vw] max-w-[30rem]"
          label="Feedback"
          placeholder="Tell us on how to improve."
          {...form.getInputProps("message")}
        />

        <TextInput
          required={false}
          className="w-[90vw] max-w-[30rem]"
          label="Contact email"
          placeholder="To hear back from us (optional)"
          {...form.getInputProps("contactEmail")}
        />

        <p className="text-center text-gray-400">
          Feedbacks are anonymous (
          <Link href="https://github.com/zeus-12/fmhy/blob/main/src/pages/feedback.tsx">
            source code
          </Link>
          ), please don&apos;t spam.
        </p>
        <Button
          loading={loading}
          onClick={submitFeedbackHandler}
          color="pink"
          variant="subtle"
        >
          Submit
        </Button>
        {error && (
          <p className="font-semibold text-red-400">Something went wrong</p>
        )}
        {success && (
          <p className="font-semibold text-green-400">
            Successfully submitted!
          </p>
        )}
      </div>
    </>
  );
};
export default Feedback;
