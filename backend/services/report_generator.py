import os
import matplotlib.pyplot as plt

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    Image
)

from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import inch

from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.cidfonts import UnicodeCIDFont


REPORT_DIR = "reports"


# =====================================================
# ⭐ Create Accuracy Chart
# =====================================================
def generate_accuracy_chart(results, model_id):

    os.makedirs(REPORT_DIR, exist_ok=True)

    nodes = []
    accuracies = []

    for r in results:
        if r.get("status") == "evaluated":
            nodes.append(r["node"])
            accuracies.append(r["accuracy"])

    if not nodes:
        return None

    plt.figure()
    plt.bar(nodes, accuracies)
    plt.title("Model Accuracy per Hospital")

    chart_path = os.path.join(REPORT_DIR, f"{model_id}_chart.png")
    plt.savefig(chart_path)
    plt.close()

    return chart_path


# =====================================================
# ⭐ Generate Executive Summary
# =====================================================
def build_summary(results):

    evaluated = [r for r in results if r.get("status") == "evaluated"]

    if not evaluated:
        return "No compatible datasets were evaluated."

    avg_acc = sum(r["accuracy"] for r in evaluated) / len(evaluated)

    max_bias = max(
        [r.get("bias_gap", 0) for r in evaluated if r.get("bias_gap") is not None],
        default=0
    )

    summary = f"""
    This report summarizes federated evaluation results.

    Evaluated Hospitals: {len(evaluated)}
    Average Accuracy: {avg_acc:.2f}
    Maximum Bias Gap: {max_bias:.3f}

    Higher bias gap may indicate fairness risk across sensitive groups.
    """

    return summary


# =====================================================
# ⭐ MAIN REPORT BUILDER
# =====================================================
def generate_report(results, model_id):

    os.makedirs(REPORT_DIR, exist_ok=True)

    file_path = os.path.join(REPORT_DIR, f"{model_id}_report.pdf")

    # REQUIRED FONT (per rules)
    pdfmetrics.registerFont(UnicodeCIDFont("HeiseiMin-W3"))

    styles = getSampleStyleSheet()
    styles["Normal"].fontName = "HeiseiMin-W3"

    title_style = ParagraphStyle(
        "title",
        fontName="HeiseiMin-W3",
        fontSize=18,
        spaceAfter=20
    )

    heading_style = ParagraphStyle(
        "heading",
        fontName="HeiseiMin-W3",
        fontSize=14,
        spaceAfter=10
    )

    doc = SimpleDocTemplate(file_path, pagesize=A4)

    elements = []

    # =================================================
    # TITLE
    # =================================================
    elements.append(
        Paragraph(f"Benchmark Health — Federated AI Report", title_style)
    )

    elements.append(Paragraph(f"Model ID: {model_id}", styles["Normal"]))
    elements.append(Spacer(1, 12))

    # =================================================
    # EXECUTIVE SUMMARY
    # =================================================
    elements.append(Paragraph("Executive Summary", heading_style))

    summary_text = build_summary(results)
    elements.append(Paragraph(summary_text, styles["Normal"]))
    elements.append(Spacer(1, 20))

    # =================================================
    # TABLE
    # =================================================
    elements.append(Paragraph("Evaluation Results", heading_style))

    table_data = [["Node", "Status", "Accuracy", "Bias Gap"]]

    for r in results:

        table_data.append([
            r.get("node"),
            r.get("status"),
            str(round(r.get("accuracy", 0), 3)) if r.get("accuracy") else "-",
            str(r.get("bias_gap", "-"))
        ])

    table = Table(table_data, colWidths=[1.5*inch]*4)

    table.setStyle([
        ("GRID", (0,0), (-1,-1), 1, colors.black),
        ("BACKGROUND", (0,0), (-1,0), colors.lightgrey)
    ])

    elements.append(table)
    elements.append(Spacer(1, 20))

    # =================================================
    # ACCURACY CHART
    # =================================================
    elements.append(Paragraph("Accuracy Visualization", heading_style))

    chart_path = generate_accuracy_chart(results, model_id)

    if chart_path:
        img = Image(chart_path, width=5*inch, height=3*inch)
        elements.append(img)

    # =================================================
    # BUILD PDF
    # =================================================
    doc.build(elements)

    return file_path