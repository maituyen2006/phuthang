export class HTMLUtils {
  elementStyles: ElementStyle[];
  styleStr = '';
  title = 'Tiêu đề';
  body = 'Nội dung';
  win: Window;
  constructor(elementStyles?: ElementStyle[], title?: string, body?: string, styleStr?: string) {
    this.elementStyles = elementStyles, this.styleStr = styleStr, this.title = title, this.body = body;
  }
  open() {
    let headStyle = '<style>';
    if (this.elementStyles) {
      for (const elementStyle of this.elementStyles) {
        headStyle += `${elementStyle.elm}{`;
        elementStyle.styles.forEach(style => {
          headStyle += `${style.key}:${style.value};`;
        });
        headStyle += '}';
      }
    }
    headStyle += this.styleStr;
    headStyle += '</style>';
    const head = `<head><title>${this.title}</title>${headStyle}</head>`;
    const body = `<body>${this.body}</body>`;
    const html = `<!doctype html><html lang="en">${head}${body}</html>`;
    this.win = window.open('', 'Chi tiết phiếu KCS', `toolbar=no,location=no,directories=no,status=no,menubar=no,
    scrollbars=yes,resizable=no,width=${screen.width},height=${screen.height},top=0,left=0`);
    if (this.win) {
      this.win.document.body.innerHTML = html;
    }
  }
  print() {
    this.win.onload = () => {
      this.win.print();
      this.win.close();
    }
  }
}

export class Style {
  key;
  value;
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}
export class ElementStyle {
  elm: string;
  styles: Style[];
  constructor(elm: string, styles: Style[]) {
    this.elm = elm;
    this.styles = styles;
  }
}

export class Table {
  thead: string[];
  tbody: any[];
  constructor(thead: string[], tbody: any[]) {
    this.thead = thead;
    this.tbody = tbody;
  }
  html() {
    let thead = '<thead><tr>';
    for (const th of this.thead) {
      thead += `<th>${th}</th>`;
    }
    thead += '</tr></thead>';
    let tbody = '<tbody>';
    for (const tr of this.tbody) {
      tbody += '<tr>';
      for (const td of Object.keys(tr)) {
        tbody += `<td>${tr[td]}</td>`;
      }
      tbody += '</tr>';
    }
    tbody += '</tbody>';
    return `<table>${thead}${tbody}</table>`;
  }
}
