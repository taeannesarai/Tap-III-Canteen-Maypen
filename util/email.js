import ejs from 'ejs';
import nodemailer from "nodemailer";
import { htmlToText } from 'html-to-text';
import path from 'path';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const ___dirname = dirname(fileURLToPath(import.meta.url));
