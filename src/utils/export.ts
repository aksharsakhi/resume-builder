import type { ResumeData, ResumeSettings } from '../types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';

const getThemeColors = (theme: ResumeSettings['colorTheme']) => {
  const themes: Record<string, { primary: string; secondary: string }> = {
    blue: { primary: '2563eb', secondary: '1e40af' },
    green: { primary: '059669', secondary: '047857' },
    purple: { primary: '7c3aed', secondary: '6d28d9' },
    red: { primary: 'dc2626', secondary: 'b91c1c' },
    orange: { primary: 'ea580c', secondary: 'c2410c' },
    teal: { primary: '0d9488', secondary: '0f766e' },
    gray: { primary: '374151', secondary: '1f2937' },
  };
  return themes[theme] || themes.blue;
};

export async function downloadPdf(resume: ResumeData, _settings: ResumeSettings): Promise<void> {
  const element = document.querySelector('.resume-template') as HTMLElement;
  if (!element) {
    alert('Please preview your resume first');
    return;
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  const imgWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;

  const pdf = new jsPDF('p', 'mm', 'a4');
  let position = 0;

  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(`${resume.personalInfo.fullName || 'resume'}.pdf`);
}

export async function downloadWord(resume: ResumeData, settings: ResumeSettings): Promise<void> {
  const { personalInfo, experience, education, skills, projects, certifications } = resume;
  const colors = getThemeColors(settings.colorTheme);

  const children: Paragraph[] = [];

  // Header
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: personalInfo.fullName || 'Your Name',
          bold: true,
          size: 48,
          color: colors.primary,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
    })
  );

  // Contact
  const contactParts = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.website,
  ].filter(Boolean);

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: contactParts.join(' | '),
          size: 20,
          color: '666666',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
    })
  );

  // Summary
  if (personalInfo.summary) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'PROFESSIONAL SUMMARY',
            bold: true,
            size: 24,
            color: colors.primary,
          }),
        ],
        border: {
          bottom: { color: colors.primary, space: 1, style: BorderStyle.SINGLE, size: 6 },
        },
        spacing: { before: 200, after: 100 },
      })
    );
    children.push(
      new Paragraph({
        children: [new TextRun({ text: personalInfo.summary, size: 22 })],
        spacing: { after: 200 },
      })
    );
  }

  // Experience
  if (experience.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'WORK EXPERIENCE',
            bold: true,
            size: 24,
            color: colors.primary,
          }),
        ],
        border: {
          bottom: { color: colors.primary, space: 1, style: BorderStyle.SINGLE, size: 6 },
        },
        spacing: { before: 200, after: 100 },
      })
    );

    experience.forEach(exp => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: exp.position || 'Position', bold: true, size: 22 }),
            new TextRun({ text: ` - ${exp.company || 'Company'}`, size: 22 }),
          ],
          spacing: { before: 150 },
        })
      );
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`,
              italics: true,
              size: 20,
              color: '666666',
            }),
          ],
          spacing: { after: 50 },
        })
      );
      if (exp.description) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: exp.description, size: 20 })],
            spacing: { after: 150 },
          })
        );
      }
    });
  }

  // Education
  if (education.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'EDUCATION',
            bold: true,
            size: 24,
            color: colors.primary,
          }),
        ],
        border: {
          bottom: { color: colors.primary, space: 1, style: BorderStyle.SINGLE, size: 6 },
        },
        spacing: { before: 200, after: 100 },
      })
    );

    education.forEach(edu => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${edu.degree || 'Degree'}${edu.field ? ` in ${edu.field}` : ''}`, bold: true, size: 22 }),
          ],
          spacing: { before: 100 },
        })
      );
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: edu.institution || 'Institution', size: 20 }),
          ],
          spacing: { after: 100 },
        })
      );
    });
  }

  // Skills
  if (skills.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'SKILLS',
            bold: true,
            size: 24,
            color: colors.primary,
          }),
        ],
        border: {
          bottom: { color: colors.primary, space: 1, style: BorderStyle.SINGLE, size: 6 },
        },
        spacing: { before: 200, after: 100 },
      })
    );
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: skills.map(s => s.name).join(' • '),
            size: 20,
          }),
        ],
        spacing: { after: 200 },
      })
    );
  }

  // Projects
  if (projects.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'PROJECTS',
            bold: true,
            size: 24,
            color: colors.primary,
          }),
        ],
        border: {
          bottom: { color: colors.primary, space: 1, style: BorderStyle.SINGLE, size: 6 },
        },
        spacing: { before: 200, after: 100 },
      })
    );

    projects.forEach(proj => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: proj.name || 'Project', bold: true, size: 22 }),
          ],
          spacing: { before: 100 },
        })
      );
      if (proj.technologies) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: `Technologies: ${proj.technologies}`, italics: true, size: 18, color: '666666' }),
            ],
          })
        );
      }
      if (proj.description) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: proj.description, size: 20 })],
            spacing: { after: 100 },
          })
        );
      }
    });
  }

  // Certifications
  if (certifications.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'CERTIFICATIONS',
            bold: true,
            size: 24,
            color: colors.primary,
          }),
        ],
        border: {
          bottom: { color: colors.primary, space: 1, style: BorderStyle.SINGLE, size: 6 },
        },
        spacing: { before: 200, after: 100 },
      })
    );

    certifications.forEach(cert => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: cert.name || 'Certification', bold: true, size: 20 }),
            new TextRun({ text: ` - ${cert.issuer || 'Issuer'}`, size: 20 }),
          ],
          spacing: { before: 50 },
        })
      );
    });
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${personalInfo.fullName || 'resume'}.docx`);
}
