import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import express from 'express';
import cors from 'cors';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.post('/fsaig', async (req, res) => {
    const prompt = req.body.prompt;

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
    });

    const image = aiResponse.data.data[0].url;
    res.send({ image });
});

app.listen(process.env.PORT || 8080, () => console.log('make art on https://fsa-ig.surge.sh/fsaig')); //* 8080 *//