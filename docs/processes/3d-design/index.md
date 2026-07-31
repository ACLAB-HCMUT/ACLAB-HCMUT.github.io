---
slug: /3d-design
title: 3D Design Process
---

# 3D Design Process

This section describes the standard mechanical design workflow used in ACLab for robotics, embedded systems, and electronic products. It covers the complete process from product requirements to manufacturing-ready files.

## Workflow Overview

| Step | Required | Description |
| ------ | :------: | ----------- |
| Requirement Analysis | ✅ | Define functional and mechanical requirements. |
| Concept Design | ✅ | Create sketches, concept art, or rough layouts. |
| CAD Modeling | ✅ | Build parametric 3D models of all components. |
| Assembly Verification | ✅ | Verify fit, clearance, and assembly sequence. |
| Design for Manufacturing (DFM) | ✅ | Optimize the design for the selected manufacturing process. |
| Simulation (FEA / Motion / Thermal) | Optional | Validate structural or thermal performance when necessary. |
| Prototype | Recommended | Produce and evaluate physical prototypes. |
| Production Release | ✅ | Generate manufacturing files and documentation. |

> **Minimum workflow:** Requirement → Concept → CAD → Assembly Verification → DFM → Manufacturing Files

---

# Software Used in ACLab

| Software | Purpose | Status | Notes |
| -------- | ------- | ------ | ----- |
| **Fusion 360** | CAD, Assembly, Drawing, CAM | ✅ Primary | Standard CAD software used in ACLab |
| FreeCAD | Open-source CAD | Optional | Suitable for Linux users |
| SolidWorks | Mechanical CAD | Not Used | Commercial license required |
| Siemens NX | Enterprise CAD | Not Used | Powerful but intended for large-scale industrial projects |
| Onshape | Cloud CAD | Optional | Useful for online collaboration |

> ACLab standardizes on **Fusion 360** to simplify collaboration, file sharing, and training.

---

# Design Inputs

Mechanical design usually starts from one or more of the following:

- Product specification
- Functional requirements
- PCB outline
- Electrical schematics
- Component datasheets
- Existing products
- Reference CAD models
- Concept art
- Hand sketches
- Customer requirements
- Industrial design requirements

---

# Design Workflow

## 1. Requirement Analysis

Define:

- Product dimensions
- Functional requirements
- Mechanical constraints
- Manufacturing process
- Cost target
- Material selection

**Input**

- Product specification
- Customer requirements

**Output**

- Mechanical requirements
- Initial dimensions
- Design constraints

---

## 2. Concept Design

Develop the overall mechanical concept before creating CAD models.

Activities include:

- Hand sketches
- Concept art
- Block diagrams
- Internal component layout

**Input**

- Requirements

**Output**

- Concept sketch
- Layout proposal

---

## 3. CAD Modeling

Create parametric CAD models for every mechanical component.

Good practices:

- Fully constrain sketches
- Use parameters whenever possible
- Organize feature history
- Avoid duplicated dimensions

**Input**

- Concept design

**Output**

- Fusion 360 CAD files (.f3d)

---

## 4. Assembly Verification

Assemble all parts and verify:

- Mechanical interference
- PCB clearance
- Cable routing
- Fastener accessibility
- Motion clearance
- Serviceability

**Input**

- Individual CAD parts

**Output**

- Complete assembly model

---

## 5. Design for Manufacturing (DFM)

Optimize the design according to the manufacturing method.

Typical processes include:

- 3D Printing
- CNC Machining
- Injection Molding
- Sheet Metal Fabrication

Consider:

- Wall thickness
- Draft angles
- Tolerances
- Screw bosses
- Snap-fits
- Tool accessibility

**Output**

- Manufacturing-ready CAD model

---

## 6. Simulation *(Optional)*

Simulation is performed only when required.

Examples:

- Static structural analysis (FEA)
- Thermal simulation
- Motion simulation
- Load analysis

Simulation helps identify potential issues before prototyping but is not mandatory for every project.

---

## 7. Prototype

Prototype using:

- FDM 3D Printing
- SLA Printing
- CNC machining
- Laser cutting

Evaluate:

- Assembly
- Strength
- Ergonomics
- Manufacturability

---

## 8. Production Release

After validation, prepare all manufacturing documentation.

Typical deliverables:

- Manufacturing drawings
- Assembly drawings
- BOM
- CAD exchange files

---

# Input / Output Summary

| Stage | Input | Output |
| ------ | ----- | ------ |
| Requirement Analysis | Product specification | Mechanical requirements |
| Concept Design | Requirements | Sketches / Concept art |
| CAD Modeling | Concept design | Fusion 360 models (.f3d) |
| Assembly Verification | CAD parts | Assembly model |
| Simulation *(Optional)* | Assembly | Simulation report |
| Prototype | STEP / STL | Physical prototype |
| Production Release | Verified CAD | Manufacturing files |

---

# Manufacturing Outputs

Different manufacturing processes require different output formats.

| File | Purpose |
| ---- | ------- |
| **.f3d** | Native Fusion 360 project |
| **.step** | CAD exchange format for further editing in most CAD software |
| **.stl** | Mesh model for 3D printing |
| **.3mf** | Modern 3D printing format with material and printer settings |
| **.dxf** | 2D profile for laser cutting or CNC machining |
| **.pdf** | Engineering drawings |
| **.csv** | Bill of Materials (BOM) export |

---

# Design Review Checklist

Before releasing a design, verify the following:

- CAD sketches are fully constrained
- No assembly interference
- PCB dimensions are verified
- Cable routing is feasible
- Screw locations are accessible
- Correct fasteners are selected
- Manufacturing tolerances are reasonable
- Material selection is appropriate
- Design supports assembly and maintenance
- Manufacturing files have been exported successfully

---

# References

Recommended topics for further study:

- Parametric CAD Design
- Design for Manufacturing (DFM)
- Design for Assembly (DFA)
- GD&T (Geometric Dimensioning & Tolerancing)
- Injection Molding Design
- CNC Machining Design
- 3D Printing Design Guidelines

> Store CAD projects, manufacturing drawings, design reviews, and revision history in this section.


## Common Design Mistakes

The following issues are frequently encountered in mechanical design projects. Most of them can be avoided by following the complete workflow and performing a final design review.

<details>
<summary><b>Skipping Design for Manufacturing (DFM)</b></summary>

Designing only for appearance or functionality often leads to expensive manufacturing problems.

- Wall thickness outside manufacturer limits.
- Draft angles missing for injection molding.
- Internal corners impossible to machine with CNC.
- Tolerances beyond manufacturing capability.
- Features smaller than the selected process allows.

**Result**

- Higher manufacturing cost.
- Multiple redesign iterations.
- Production delays.

</details>

<details>
<summary><b>Choosing the Wrong Manufacturing Process</b></summary>

Each manufacturing process has different design constraints.

Examples:

- Designing an injection-molded enclosure then producing it with FDM printing.
- CNC parts containing impossible internal sharp corners.
- Sheet metal parts without bend allowance.
- Plastic parts designed with metal design rules.

Always decide the manufacturing process before detailed CAD modeling.

</details>

<details>
<summary><b>Ignoring 3D Printing Constraints</b></summary>

A printable model is not always an easy-to-print model.

Common issues include:

- Poor print orientation.
- Excessive support material.
- Large flat surfaces causing warping.
- Thin walls below printer capability.
- Parts exceeding build volume.

Large models should often be split into multiple printable pieces.

</details>

<details>
<summary><b>Not Splitting Large Parts</b></summary>

Very large components are difficult to manufacture.

Splitting the model can:

- Reduce print failures.
- Improve surface quality.
- Reduce support material.
- Simplify maintenance.
- Allow damaged sections to be replaced individually.

Design alignment pins, screw joints, or snap-fits before splitting the model.

</details>

<details>
<summary><b>Incorrect Units</b></summary>

Unit mistakes are surprisingly common.

Typical examples:

- Exporting inches instead of millimeters.
- Importing STEP files with incorrect scale.
- Mixing mm and cm in one project.

Always verify document units before exporting.

</details>

<details>
<summary><b>Not Verifying Exported Files</b></summary>

Never send files directly to a manufacturer without checking them.

Verify:

- Geometry is complete.
- No missing bodies.
- Correct orientation.
- Correct dimensions.
- Correct coordinate system.

Always open exported STEP or STL files using another CAD viewer.

</details>

<details>
<summary><b>Sharp Edges Everywhere</b></summary>

Leaving every edge perfectly sharp creates unnecessary problems.

Potential issues:

- Difficult assembly.
- Unsafe handling.
- Stress concentration.
- Poor product appearance.

Add chamfers or fillets whenever function allows.

</details>

<details>
<summary><b>Unrealistic Tolerances</b></summary>

Tighter tolerance does **not** always mean better quality.

Examples:

- ±0.01 mm on plastic enclosures.
- Precision machining where clearance is acceptable.

Choose tolerances according to:

- Manufacturing capability.
- Functional requirements.
- Project budget.

</details>

<details>
<summary><b>Insufficient Assembly Clearance</b></summary>

A CAD assembly may look correct but still fail during real assembly.

Typical mistakes:

- USB connector cannot be inserted.
- Cable bend radius ignored.
- Fan blocked by nearby components.
- Screwdriver cannot access screws.
- PCB touches enclosure wall.

Always leave clearance for installation and maintenance.

</details>

<details>
<summary><b>Ignoring Standard Components</b></summary>

Avoid designing custom hardware unless absolutely necessary.

Prefer:

- Standard ISO screws.
- Standard bearings.
- Standard threaded inserts.
- Commercially available fasteners.

Standard components reduce both manufacturing and maintenance costs.

</details>

<details>
<summary><b>Poor Version Control</b></summary>

Production problems often come from file management rather than CAD.

Good practices:

- Use revision numbers.
- Archive released versions.
- Keep a change log.
- Never overwrite production files.

</details>

:::caution Design review before manufacturing

Before sending files to a manufacturer, verify:

- CAD model is fully constrained.
- Assembly has no interference.
- DFM review is complete.
- Material and manufacturing process are confirmed.
- STEP/STL files have been verified.
- Engineering drawings are complete.
- BOM and revision numbers are up to date.

A 15-minute review can prevent weeks of redesign.

:::

:::tip Think beyond CAD

A successful mechanical design is not only **correct** in CAD, but also:

- Easy to manufacture.
- Easy to assemble.
- Easy to maintain.
- Cost-effective.
- Compatible with the selected production process.

Design with the entire product lifecycle in mind.

:::