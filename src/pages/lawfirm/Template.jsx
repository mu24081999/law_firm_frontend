import React, { useRef } from "react";
import StudioEditor from "@grapesjs/studio-sdk/react";
import {
  tableComponent,
  listPagesComponent,
} from "@grapesjs/studio-sdk-plugins";
import "@grapesjs/studio-sdk/style";
import { useDispatch, useSelector } from "react-redux";
import { addTemplateApi } from "../../redux/services/template";

export default function Template() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const editorInstanceRef = useRef(null); // this will hold the actual Studio instance
  const defaultPages = [
    {
      id: "home",
      name: "Home Page",
      component: `
      <section class="my-section">
        <h1 class="heading">Welcome to the Home Page</h1>
        <p>This is the home page content.</p>
      </section>
    `,
      style: `
      .my-section {
        padding: 50px;
        text-align: center;
        background: #f5f5f5;
      }

      .heading {
        color: #333;
        font-size: 2rem;
      }
    `,
    },
    {
      id: "about",
      name: "About Page",
      component: `
      <section class="my-section">
        <h1 class="heading">About Us</h1>
        <p>Here’s some information about our company.</p>
      </section>
    `,
      style: `
      .heading {
        color: green;
        font-weight: bold;
      }
    `,
    },
  ];

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
      await new Promise((resolve) => setTimeout(resolve, 100)); // small delay to ensure rendering

      const html = editor.getHtml({ inlineCss: true });
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
      name: "Modern",
      userId: user?.id,
    };
    console.log("📄 All Pages Export:", params);
    dispatch(addTemplateApi(token, params));
  };
  return (
    <>
      <StudioEditor
        style={{ height: "80vh" }}
        options={{
          licenseKey:
            "8d77e49cf1104a799ee6f7382c6fae4dc7415726555b45ca8d38fc456244dfad",
          project: { type: "web" },
          //         canvas: {
          // styles: [
          //   // Optional: external CSS files you want injected in the iframe
          //   "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
          // ],
          // scripts: [
          //   // Optional: external JS files to inject
          //   "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js",
          // ],
          // },

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
          plugins: [tableComponent.init(), listPagesComponent.init()],
        }}
        onReady={(editor) => {
          editorInstanceRef.current = editor; // Save instance once ready
          // editor.setComponents(initialHtml);
          // editor.setStyle(initialCss);
          const pages = editor.Pages;

          defaultPages.forEach(({ id, name, component, style }, index) => {
            const page = pages.add({ id, name });
            pages.select(id);
            editor.setComponents(component);
            editor.setStyle(style);
          });

          // Re-select first page as default
          pages.select(defaultPages[0].id);
        }}
      />

      <button onClick={handleExport}>Get HTML with Inline Styles</button>
    </>
  );
}
