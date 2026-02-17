import Document from "../models/Document.js";

export const createDocument = async (req, res) => {
  const document = await Document.create({
    title: req.body.title,
    content: req.body.content || "",
    owner: req.user._id
  });

  res.status(201).json(document);
};

export const getDocuments = async (req, res) => {
  const documents = await Document.find({ owner: req.user._id })
    .sort({ updatedAt: -1 });

  res.json(documents);
};

export const getDocumentById = async (req, res) => {
  const document = await Document.findById(req.params.id);

  if (!document) {
    return res.status(404).json({ message: "Document not found" });
  }

  res.json(document);
};

export const updateDocument = async (req, res) => {
  const document = await Document.findById(req.params.id);

  if (!document) {
    return res.status(404).json({ message: "Not found" });
  }

  document.content = req.body.content ?? document.content;
  document.title = req.body.title ?? document.title;

  await document.save();

  res.json(document);
};
