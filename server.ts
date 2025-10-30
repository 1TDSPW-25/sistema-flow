import express, { Request, Response, Application } from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import fsPromises from 'fs/promises';
import fs from 'fs';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

const app: Application = express();
const port: number = 3001;


app.use(cors());



const uploadDir: string = path.join(__dirname, 'public/uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, uploadDir);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });



/**
 * @route 
 * @desc 
 */
app.post('/upload', upload.single('file'), (req: Request, res: Response) => {

  if (!req.file) {
    return res.status(400).send({ message: 'Nenhum arquivo enviado.' });
  }

  const fileUrl: string = `/uploads/${req.file.filename}`;

  // Responde ao front-end com sucesso e a URL do arquivo
  res.status(200).send({
    message: 'Arquivo enviado com sucesso!',
    url: fileUrl,
  });
});

app.get('/files', async (req: Request, res: Response) => {
  try {

    const fileNames = await fsPromises.readdir(uploadDir);

    const fileUrls = fileNames
      .map(fileName => `/uploads/${fileName}`)
      .filter(fileName => !fileName.split('/').pop()?.startsWith('.'));

    res.status(200).json(fileUrls);

  } catch (error) {
    console.error('Erro ao listar arquivos:', error);
    res.status(500).send({ message: 'Erro interno ao buscar arquivos.' });
  }
});


app.listen(port, (): void => {
  console.log(`Servidor de upload (TypeScript) rodando em http://localhost:${port}`);
});