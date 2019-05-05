import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';
import * as JSZipUtils from 'jszip-utils';
import * as Docxtemplater from 'docxtemplater';

export class DocxService {

  public process(template_path: string, template_file: string, data: any, output_file: string): void {

    const file = `${template_path}/${template_file}`;
    JSZipUtils.getBinaryContent(file , function( error: any, content: string) {
        if (error) {
            throw error;
        }
        const zip: JSZip = new JSZip(content);
        const doc = new Docxtemplater();
        doc.loadZip(zip);
        doc.setData(data);
        try {
            doc.render();
        } catch (error) {
            const e = {
                   message: error.message,
                   name: error.name,
                   stack: error.stack,
                   properties: error.properties
            };
            console.log(JSON.stringify({error: e}));
             // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
            throw error;
        }
        const out = doc.getZip().generate({ type: 'blob',
             mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
        saveAs(out, output_file);
     });
  }
}
