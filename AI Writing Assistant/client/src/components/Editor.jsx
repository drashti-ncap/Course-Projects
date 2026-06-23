import React, { useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";

import {
  FaSpellCheck,
  FaSyncAlt,
  FaCheck,
  FaPencilAlt,
} from "react-icons/fa";

import { SiGrammarly } from "react-icons/si";

const Editor = () => {
  const auth = getAuth();

  const [text, setText] = useState("");
  const [selectedSentence, setSelectedSentence] =
    useState("");

  const [rephrasedSentences, setRephrasedSentences] =
    useState([]);

  const [correctedSentences, setCorrectedSentences] =
    useState([]);

  const [spellCheckedText, setSpellCheckedText] =
    useState("");

  const [grammarCheckedText, setGrammarCheckedText] =
    useState("");

  const getToken = async () => {
    const user = auth.currentUser;


    if (!user) {
      alert("Please login first");
      throw new Error("User not logged in");
    }

    return await user.getIdToken();


  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSentenceSelection = () => {
    const selection =
      window.getSelection().toString();


    setSelectedSentence(selection);


  };

  const checkSpelling = async () => {
    try {
      const token =
        await getToken();


      const response =
        await axios.post(
          "http://localhost:8000/api/spellcheck",
          { text },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setSpellCheckedText(
        response.data.correctedText ||
        ""
      );

    } catch (error) {
      console.error(error);
    }


  };

  const checkGrammar = async () => {
    try {
      const token =
        await getToken();


      const response =
        await axios.post(
          "http://localhost:8000/api/grammarcheck",
          { text },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setGrammarCheckedText(
        response.data.correctedText ||
        ""
      );

    } catch (error) {
      console.error(error);
    }


  };

  const rephraseSentence =
    async () => {
      try {
        const token =
          await getToken();


        const response =
          await axios.post(
            "http://localhost:8000/api/analyze",
            {
              sentence:
                selectedSentence,
            },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setRephrasedSentences(
          response.data
            .rephrasedSentences ||
          []
        );

      } catch (error) {
        console.error(
          error
        );
      }
    };


  const addCorrectedSentence = (
    sentence
  ) => {
    setCorrectedSentences(
      (prev) => [
        ...prev,
        sentence,
      ]
    );
  };

  return (<div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">


    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      <div className="md:col-span-2">

        <div className="bg-white shadow-lg rounded-lg p-6">

          <h2 className="text-2xl font-bold mb-4 text-blue-600">
            AI Writing Assistant
          </h2>

          <textarea
            value={text}
            onChange={
              handleTextChange
            }
            onMouseUp={
              handleSentenceSelection
            }
            placeholder="Type your text here..."
            rows={10}
            className="w-full p-4 border rounded-lg"
          />

          <div className="flex gap-4 mt-4">

            <Button
              onClick={
                checkSpelling
              }
              icon={
                <FaSpellCheck />
              }
            >
              Check Spelling
            </Button>

            <Button
              onClick={
                checkGrammar
              }
              icon={
                <SiGrammarly />
              }
            >
              Check Grammar
            </Button>

             

          </div>

          {(spellCheckedText ||
            grammarCheckedText) && (
              <div className="grid grid-cols-2 gap-4 mt-6">

                {spellCheckedText && (
                  <ResultCard
                    title="Spell Checked Text"
                    text={
                      spellCheckedText
                    }
                    icon={
                      <FaSpellCheck />
                    }
                    onAccept={() =>
                      addCorrectedSentence(
                        spellCheckedText
                      )
                    }
                  />
                )}

                {grammarCheckedText && (
                  <ResultCard
                    title="Grammar Checked Text"
                    text={
                      grammarCheckedText
                    }
                    icon={
                      <SiGrammarly />
                    }
                    onAccept={() =>
                      addCorrectedSentence(
                        grammarCheckedText
                      )
                    }
                  />
                )}

              </div>
            )}

        </div>

        {selectedSentence && (
          <div className="bg-white p-6 rounded-lg shadow mt-6">

            <h3 className="text-xl font-bold mb-2 flex items-center">
              <FaPencilAlt className="mr-2" />
              Selected Sentence
            </h3>

            <p className="mb-4">
              {selectedSentence}
            </p>

            <Button
              onClick={
                rephraseSentence
              }
              icon={
                <FaSyncAlt />
              }
            >
              Rephrase
            </Button>

          </div>
        )}

        {rephrasedSentences.length >
          0 && (
            <div className="bg-white p-6 rounded-lg shadow mt-6">

              <h3 className="text-xl font-bold mb-4">
                Rephrased Sentences
              </h3>

              {rephrasedSentences.map(
                (
                  sentence,
                  index
                ) => (
                  <div
                    key={index}
                    className="mb-4"
                  >
                    <p>
                      {
                        sentence
                      }
                    </p>

                    <Button
                      onClick={() =>
                        addCorrectedSentence(
                          sentence
                        )
                      }
                      icon={
                        <FaCheck />
                      }
                    >
                      Accept
                    </Button>

                  </div>
                )
              )}

            </div>
          )}

      </div>

      <div className="bg-white p-6 rounded-lg shadow">

        <h3 className="text-xl font-bold mb-4">
          Corrected Sentences
        </h3>

        {correctedSentences
          .length ===
          0 ? (
          <p>
            No corrections
            yet
          </p>
        ) : (
          correctedSentences.map(
            (
              sentence,
              index
            ) => (
              <p
                key={
                  index
                }
                className="mb-2"
              >
                {
                  sentence
                }
              </p>
            )
          )
        )}

      </div>

    </div>
  </div>


  );
};

const Button = ({
  onClick,
  children,
  icon,
}) => (
  <button
    onClick={onClick}
    className="bg-blue-600 text-white px-5 py-2 rounded-full flex items-center"

  >


    <span className="mr-2">



      {icon}
    </span>

    {children}


  </button>
);

const ResultCard = ({
  title,
  text,
  onAccept,
  icon,
}) => (

  <div className="bg-gray-50 p-4 rounded">


    <h3 className="font-bold flex items-center">
      <span className="mr-2">
        {icon}
      </span>

      {title}
    </h3>

    <p className="my-3">
      {text}
    </p>

    <Button
      onClick={onAccept}
      icon={<FaCheck />}
    >
      Accept
    </Button>


  </div>
);

export default Editor;
