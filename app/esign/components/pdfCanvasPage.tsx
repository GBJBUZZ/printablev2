"use client";

export interface SignData {
  type: "sign" | "text" | "date" | "checkbox" | "initials" | "documentId";
  signUrl?: string;
  value?: string | undefined;
  checked?: boolean;
  fontSize?: number;
  color?: string;
  signSize: { width: number; height: number };
  position: { x: number; y: number; pageIndex: number | null };
}

import type React from "react";
import { useRef, useEffect, useState } from "react";
import { useSignUrl } from "../useSign";
import { Rnd } from "react-rnd";
import { useUser } from "@clerk/nextjs";
import EditCard from "./editCard";

const PdfCanvasPage = ({
  page,
  viewport,
  pageIndex,
}: {
  page: any;
  viewport: any;
  pageIndex: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    updateSign,
    signs,
    addSign,
    removeSign,
    currentSignIndex,
    signDragging,
    setSignDragging,
    signImages,
    setCurrentSlide,
  } = useSignUrl();
  const [currentClickedImgIndex, setImgIndex] = useState<number | null>(null);

  const { user } = useUser();
  const [isCard, setCard] = useState(true);
  const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Delete" && currentClickedImgIndex != null) {
        removeSign(currentClickedImgIndex);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentClickedImgIndex]);

  useEffect(() => {
    let renderTask: any;

    const renderPage = async () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: ctx!,
        viewport,
      };

      renderTask = page.render(renderContext);
      try {
        await renderTask.promise;
      } catch (error) {
        if (typeof error === "object" &&
    error !== null &&
    "name" in error &&
    (error as any).name === "RenderingCancelledException"
  ) {
          console.log("Previous render cancelled");
        } else {
          console.error("Render error:", error);
        }
      }
    };

    renderPage();

    return () => {
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [page, viewport]);

  const handleDrop = (e: React.DragEvent) => {
    if (currentSignIndex === null) return;
    const container = e.currentTarget.getBoundingClientRect();
    const dropX = e.clientX - container.left;
    const dropY = e.clientY - container.top;

    if (signDragging) {
      const options: SignData = {
        type: "sign",
        signUrl: signImages[currentSignIndex],
        signSize: { width: 90, height: 100 },
        position: { x: dropX, y: dropY, pageIndex: pageIndex },
      };
      addSign(options);
      setSignDragging(false);
    }

    setImgIndex(currentSignIndex);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        canvasRef.current &&
        canvasRef.current.getBoundingClientRect().bottom > 350 &&
        canvasRef.current.getBoundingClientRect().top < 350
      ) {
        setCurrentSlide(pageIndex);
      }
    };
    document
      .getElementById("Document")
      ?.addEventListener("scroll", handleScroll);
    return () => {
      document
        .getElementById("Document")
        ?.removeEventListener("scroll", handleScroll);
    };
  }, [pageIndex]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const cardElement = document.querySelector(".card-shadow");
      if (
        cardElement &&
        !cardElement.contains(event.target as Node) &&
        !(event.target as Element).classList.contains("flex")
      ) {
        setCard(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative my-10"
      style={{ width: "100%", maxWidth: "100%" }}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <canvas ref={canvasRef} className="canva" />
      {signs.length > 0 &&
        signs.map((sign: any, index: number) => {
          const { signUrl, signSize, position, value, checked, color } = sign;

          return (
            position?.pageIndex === pageIndex && (
              <Rnd
                key={index}
                size={signSize}
                position={{ x: position.x, y: position.y }}
                onDragStop={(e, d) => {
                  updateSign(index, {
                    position: { x: d.x, y: d.y, pageIndex: pageIndex },
                  });
                }}
                onResize={(e, direction, ref, delta, position) => {
                  updateSign(index, {
                    position: {
                      x: position.x,
                      y: position.y,
                      pageIndex: pageIndex,
                    },
                    signSize: {
                      width: ref.offsetWidth,
                      height: ref.offsetHeight,
                    },
                  });
                }}
                disableDragging={sign.type === "documentId"}
                enableResizing={
                  sign.type === "documentId"
                    ? false
                    : sign.type !== "checkbox"
                    ? true
                    : {
                        top: false,
                        right: false,
                        bottom: false,
                        left: false,
                        topRight: false,
                        bottomRight: false,
                        bottomLeft: false,
                        topLeft: false,
                      }
                }
                style={{
                  border:
                    currentClickedImgIndex === index
                      ? "2px dashed #1e90ff"
                      : "none",
                  borderRadius: "4px",
                  padding: "2px",
                }}
              >
                {signUrl && (
                  <img
                    src={signUrl}
                    onClick={() => setImgIndex(index)}
                    className="w-full h-full"
                  />
                )}
                {value != null && (
                  <div
                    className=" space-y-2"
                    style={{
                      fontSize: `${sign.fontSize}px`,
                    }}
                  >
                    {sign.type !== "documentId" && (
                      <input
                        type={
                          sign.type === "initials"
                            ? "text"
                            : sign.type === "date"
                            ? "date"
                            : sign.type === "checkbox"
                            ? "checkbox"
                            : "text"
                        }
                        id={`check-${index}`}
                        checked={sign.type === "checkbox" ? value : null}
                        value={sign.type !== "checkbox" ? value : value}
                        onClick={() => {
                          setCard(true);
                          setCardIndex(index);
                        }}
                        onChange={(e) =>
                          updateSign(index, {
                            value:
                              sign.type === "checkbox"
                                ? e.target.checked
                                : e.target.value,
                          })
                        }
                        className={"outline-none w-full border border-black"}
                        style={{
                          color: (color as string) || "#000000",
                          padding: "0",
                          margin: "0",
                          lineHeight: "1",
                          boxSizing: "border-box",
                          display: "flex",
                          alignItems: "center",
                        }}
                      />
                    )}

                    {isCard && cardIndex === index && (
                      <EditCard index={index} type={sign.type} />
                    )}
                  </div>
                )}
              </Rnd>
            )
          );
        })}
    </div>
  );
};

export default PdfCanvasPage;
