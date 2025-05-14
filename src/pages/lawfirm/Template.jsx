import React, { useEffect, useRef, useState } from "react";
import StudioEditor from "@grapesjs/studio-sdk/react";
import {
  tableComponent,
  listPagesComponent,
} from "@grapesjs/studio-sdk-plugins";
import "@grapesjs/studio-sdk/style";
import juice from "juice";

import { useDispatch, useSelector } from "react-redux";
import {
  addTemplateApi,
  getDefaultTemplates,
  getUserTemplate,
} from "../../redux/services/template";
import Button from "../../components/Button";
import HtmlToImage from "../components/HtmlToImage";

export default function Template() {
  const dispatch = useDispatch();
  const { template: currentTemplate, templates: defaultTemplates } =
    useSelector((state) => state.template);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [defaultPages, setDefualtPages] = useState([]);
  const { user, token } = useSelector((state) => state.auth);
  const editorInstanceRef = useRef(null); // this will hold the actual Studio instance
  function cssToJson(cssString) {
    const jsonResult = {};
    const blocks = cssString.match(/[^{}]+{[^{}]+}/g) || [];

    blocks.forEach((block) => {
      const [selector, rules] = block.split("{");
      const cleanSelector = selector.trim();
      const properties = rules
        .replace("}", "")
        .trim()
        .split(";")
        .filter(Boolean);

      jsonResult[cleanSelector] = {};

      properties.forEach((prop) => {
        const [key, value] = prop.split(":");
        if (key && value) {
          jsonResult[cleanSelector][key.trim()] = value.trim();
        }
      });
    });

    return jsonResult;
  }

  // const defaultPages = [
  //   {
  //     id: "home",
  //     name: "Home Page",
  //     component: `
  //     <section class="my-section">
  //       <h1 class="heading">Welcome to the Home Page</h1>
  //       <p>This is the home page content.</p>
  //     </section>
  //   `,
  //     style: `
  //     .my-section {
  //       padding: 50px;
  //       text-align: center;
  //       background: #f5f5f5;
  //     }

  //     .heading {
  //       color: #333;
  //       font-size: 2rem;
  //     }
  //   `,
  //   },
  //   {
  //     id: "about",
  //     name: "About Page",
  //     component: `
  //     <section class="my-section">
  //       <h1 class="heading">About Us</h1>
  //       <p>Here’s some information about our company.</p>
  //     </section>
  //   `,
  //     style: `
  //     .heading {
  //       color: green;
  //       font-weight: bold;
  //     }
  //   `,
  //   },
  // ];

  // const handleExport = () => {
  //   const editor = editorInstanceRef.current;
  //   if (editor) {
  //     const html = editor.getHtml({ inlineCss: true });
  //     console.log("✅ HTML with inline styles:", html);
  //   }
  // };

  const handleExport = async () => {
    const editor = editorInstanceRef.current;
    if (!editor) return;

    const pages = editor.Pages.getAll();
    const result = [];

    for (const page of pages) {
      editor.Pages.select(page.id); // switch to the page
      await new Promise((resolve) => setTimeout(resolve, 100));
      const html = editor.getHtml();
      const css = editor.getCss();

      result.push({
        id: page.id,
        name: page.get("name"),
        html,
        css,
      });
    }
    const params = {
      pages: result,
      name: selectedTemplate?.name,
      userId: user?.id,
      templateId: selectedTemplate?.id,
    };
    dispatch(addTemplateApi(token, params));
  };
  useEffect(() => {
    dispatch(getUserTemplate(token, user?.id));
    dispatch(getDefaultTemplates(token));
  }, [token, user, dispatch]);
  useEffect(() => {
    if (currentTemplate?.id) {
      setSelectedTemplate(currentTemplate);
    }
  }, [currentTemplate]);
  return (
    <div>
      {showEditor ? (
        <>
          <Button onClick={() => setShowEditor(false)}> Back</Button>
          <StudioEditor
            style={{ height: "80vh" }}
            options={{
              licenseKey:
                "8d77e49cf1104a799ee6f7382c6fae4dc7415726555b45ca8d38fc456244dfad",
              project: { type: "web" },
              canvas: {
                styles: [
                  // Optional: external CSS files you want injected in the iframe
                  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
                ],
                scripts: [
                  // Optional: external JS files to inject
                  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js",
                ],
              },

              assets: {
                storageType: "self",
                onUpload: async ({ files }) => {
                  const body = new FormData();
                  for (const file of files) body.append("files", file);
                  //   const response = await fetch("ASSETS_UPLOAD_URL", {
                  //     method: "POST",
                  //     body,
                  //   });
                  //   return await response.json();
                },
                onDelete: async ({ assets }) => {
                  await fetch("ASSETS_DELETE_URL", {
                    method: "DELETE",
                    body: JSON.stringify(assets),
                  });
                },
              },
              //   assets: {
              //     storageType: "cloud",
              //   },
              storage: {
                type: "self",
                onSave: async ({ project }) => {
                  console.log(
                    "Saving project:",
                    project && JSON.stringify(project)
                  );
                },
                // onLoad: async (editor) => {
                //   const response = await fetch("PROJECT_LOAD_URL");
                //   return { project: await response.json() };
                // },
                autosaveChanges: 100,
                autosaveIntervalMs: 10000,
              },
              plugins: [
                tableComponent.init(),
                listPagesComponent.init(),
                (editor) =>
                  editor.onReady(() => {
                    // let's show the global style panel on start
                    editor.runCommand("studio:layoutToggle", {
                      id: "gs",
                      layout: "panelGlobalStyles",
                      header: { label: "Global Styles" },
                      placer: { type: "absolute", position: "right" },
                    });
                  }),
              ],
            }}
            onReady={(editor) => {
              editorInstanceRef.current = editor; // Save instance once ready
              // editor.setComponents(initialHtml);
              // editor.setStyle(initialCss);
              const pages = editor.Pages;

              Array.isArray(defaultPages) &&
                defaultPages?.forEach(
                  ({ id, name, component, style }, index) => {
                    const page = pages.add({ id, name });
                    pages.select(id);
                    editor.setComponents(component);
                    editor.setStyle(style);
                  }
                );

              // Re-select first page as default
              pages.select(defaultPages[0].id);
            }}
          />
          <Button onClick={handleExport}>Save Your Template</Button>
        </>
      ) : (
        <div>
          {currentTemplate?.id ? (
            <div>
              <div className="text-2xl font font-extrabold text-center pb-5">
                Current Template
              </div>
              <div className="flex justify-center ">
                {currentTemplate?.id && (
                  <div
                    key={currentTemplate.id}
                    className={`border rounded-lg p-4 cursor-pointer shadow-md border-indigo-500 ring-4 ring-indigo-200 bg-white`}
                    onClick={() => {
                      const pages =
                        typeof currentTemplate.pages === "string"
                          ? JSON.parse(currentTemplate?.pages || "[]")
                          : currentTemplate.pages;
                      setSelectedTemplate(currentTemplate);
                      const data = [];

                      pages?.forEach((page) => {
                        const { id, name, html, css } = page;
                        const htmlWithCss = html.replace(
                          "<head>",
                          `<head><style>${css}</style>`
                        );
                        const inlinedHtml = juice(htmlWithCss);

                        data.push({
                          id: id,
                          name: name,
                          component: inlinedHtml,
                          // style: css,
                        });
                      });
                      setDefualtPages(data);
                      setShowEditor(true);
                    }}
                  >
                    {/* <img
                      src={currentTemplate.preview_url}
                      alt={currentTemplate.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    /> */}
                    {/* <HtmlToImage
                      htmlString={
                        typeof currentTemplate?.pages === "string"
                          ? JSON.parse(currentTemplate?.pages)?.[0]?.html
                          : currentTemplate?.pages?.[0]?.html
                      }
                    /> */}
                    <h3 className="text-lg font-medium text-gray-900">
                      {currentTemplate.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {currentTemplate.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>No Template configured!!</div>
          )}
          <div>
            <div className="text-2xl font font-extrabold text-center py-5">
              Templates
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {Array.isArray(defaultTemplates) &&
                defaultTemplates?.map((template) => (
                  <div
                    key={template.id}
                    className={`border-2 shadow-md rounded-lg p-4 cursor-pointer hover:z-10  ${
                      selectedTemplate?.templateId === template.id
                        ? "border-indigo-500 ring-2 ring-indigo-200"
                        : "border-gray-200"
                    }`}
                    onClick={() => {
                      const pages =
                        typeof template.pages === "string"
                          ? JSON.parse(template?.pages || "[]")
                          : template.pages;
                      setSelectedTemplate(template);
                      const data = [];

                      pages?.forEach((page) => {
                        data.push({
                          id: page.id,
                          name: page.name,
                          component: page.html,
                          // style: cssToJson(page.css),
                        });
                      });
                      setDefualtPages(data);
                      setShowEditor(true);
                    }}
                  >
                    <img
                      src={template.preview_url}
                      alt={template.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-medium text-gray-900">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {template.description}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
