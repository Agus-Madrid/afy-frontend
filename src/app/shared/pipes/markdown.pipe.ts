import { inject, Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import DOMPurify from "dompurify";
import { marked } from "marked";

@Pipe({
    name: "markdown",
    standalone: true
})
/*
Pipe para los articulos que son hechos en markdown a html seguro mediante DOMSanitizer y DOMPurify
*/
export class MarkdownPipe implements PipeTransform{

    sanitizier = inject(DomSanitizer);

    transform(value: string | undefined): SafeHtml{
        if(!value){
            return "";
        }

        const html = marked.parse(value, {async: false}) as string;

        const sanitizedHtml = DOMPurify.sanitize(html);

        return this.sanitizier.bypassSecurityTrustHtml(sanitizedHtml);
    }
}