import dayjs from "dayjs";

export const pdfExportService = {
  /**
   * Generates a high-density, beautifully structured print layout frame.
   * Compiles items cleanly with full metadata headers and chronology mapping.
   */
  exportArticles(articles = []) {
    if (articles.length === 0) return;

    // Create an isolated printing frame workspace context
    const printWindow = window.open("", "_blank");
    const timestampStr = dayjs().format("MMMM DD, YYYY / HH:mm");
    
    // Construct semantic structural document HTML template injection vectors
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>IntelliPrep OS - Current Affairs Digest</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
          
          body {
            font-family: 'Inter', -apple-system, sans-serif;
            color: #1e293b;
            background-color: #ffffff;
            margin: 0;
            padding: 40px;
            font-size: 12px;
            line-height: 1.5;
          }
          
          .header-container {
            border-bottom: 2px solid #0f172a;
            padding-bottom: 12px;
            margin-bottom: 24px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          
          .header-title {
            font-size: 22px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: -0.025em;
            color: #0f172a;
            margin: 0;
          }
          
          .header-meta {
            font-size: 10px;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          
          .digest-count {
            font-size: 11px;
            background-color: #f1f5f9;
            padding: 4px 8px;
            border-radius: 6px;
            font-weight: 700;
            color: #334155;
          }
          
          .article-node {
            page-break-inside: avoid;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 16px;
          }
          
          .article-meta-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #f1f5f9;
            padding-bottom: 8px;
            margin-bottom: 10px;
          }
          
          .tag-stack {
            display: flex;
            gap: 6px;
            align-items: center;
          }
          
          .badge {
            font-size: 9px;
            font-weight: 800;
            padding: 2px 6px;
            border-radius: 4px;
            text-transform: uppercase;
            letter-spacing: 0.025em;
          }
          
          .badge-paper { background-color: #0f172a; color: #ffffff; }
          .badge-prelims { background-color: #fef3c7; color: #d97706; border: 1px solid #fde68a; }
          .badge-mains { background-color: #e0e7ff; color: #4f46e5; border: 1px solid #c7d2fe; }
          .badge-both { background-color: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; }
          
          .date-anchor {
            font-size: 10px;
            color: #94a3b8;
            font-weight: 600;
          }
          
          .source-tag {
            font-size: 10px;
            font-weight: 700;
            color: #475569;
          }
          
          .breadcrumb-bar {
            font-size: 10px;
            font-weight: 600;
            background-color: #f8fafc;
            padding: 6px 10px;
            border-radius: 6px;
            margin-bottom: 10px;
            color: #64748b;
          }
          
          .breadcrumb-bar span { color: #334155; font-weight: 700; }
          
          .article-title {
            font-size: 14px;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 6px 0;
            tracking-tight;
          }
          
          .article-summary {
            font-size: 11.5px;
            color: #334155;
            margin: 0;
            white-space: pre-wrap;
            line-height: 1.6;
          }
          
          @media print {
            body { padding: 0; }
            .article-node { border-color: #cbd5e1; }
          }
        </style>
      </head>
      <body>
        <div class="header-container">
          <div>
            <h1 class="header-title">IntelliPrep OS</h1>
            <div class="header-meta">Knowledge Synthesis Digest &bull; Generated ${timestampStr}</div>
          </div>
          <div class="digest-count">Total Target Nodes: ${articles.length}</div>
        </div>
        
        <div class="deck-viewport">
    `;

    // Process array records to layout injection rows
    articles.forEach((item) => {
      const typeBadgeClass = 
        item.examType === "PRELIMS" ? "badge-prelims" : 
        item.examType === "MAINS" ? "badge-mains" : "badge-both";

      htmlContent += `
        <div class="article-node">
          <div class="article-meta-row">
            <div class="tag-stack">
              <span class="badge badge-paper">${item.paperTag || "GS CONTEXT"}</span>
              <span class="badge ${typeBadgeClass}">${item.examType || "BOTH"}</span>
              <span class="date-anchor">${item.date}</span>
            </div>
            <div class="source-tag">Source: ${item.source || "Index Repository"}</div>
          </div>
          
          ${(item.subjectTag || item.topicTag) ? `
            <div class="breadcrumb-bar">
              Syllabus Linkage: <span>${item.subjectTag || ""}</span> 
              ${item.topicTag ? ` &bull; <span>${item.topicTag}</span>` : ""}
              ${item.subtopicTag ? ` &bull; <span style="font-weight:400;color:#64748b;">${item.subtopicTag}</span>` : ""}
            </div>
          ` : ""}
          
          <h2 class="article-title">${item.title}</h2>
          <p class="article-summary">${item.summary}</p>
        </div>
      `;
    });

    htmlContent += `
        </div>
      </body>
      </html>
    `;

    // Write content out payload directly into background processing iframe layout
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Core engine runtime hook: triggers system level operational overlay menu options seamlessly
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  }
};

export default pdfExportService;