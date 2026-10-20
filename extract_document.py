import base64, io, json, sys, zipfile
from pathlib import Path
from xml.etree import ElementTree
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, str(Path(__file__).parent / 'vendor' / 'pypdf.zip'))
try:
    data=json.loads(sys.stdin.buffer.read(9_000_000))
    content=base64.b64decode(data['base64'], validate=True)
    if len(content)>6_000_000: raise ValueError('Tài liệu vượt quá 6 MB.')
    if data['extension']=='.pdf':
        from pypdf import PdfReader
        reader=PdfReader(io.BytesIO(content))
        if reader.is_encrypted: raise ValueError('PDF có mật khẩu. Hãy dùng bản không khóa.')
        total=len(reader.pages)
        text='\n\n'.join((page.extract_text() or '') for page in reader.pages[:100])
        note=f'Đọc {min(total,100)}/{total} trang PDF.'
    elif data['extension']=='.docx':
        with zipfile.ZipFile(io.BytesIO(content)) as archive:
            info=archive.getinfo('word/document.xml')
            if info.file_size>8_000_000: raise ValueError('Nội dung DOCX quá lớn.')
            document=ElementTree.fromstring(archive.read(info))
            ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            text='\n'.join(''.join(node.itertext()) for node in document.findall('.//w:p',ns))
        note='Đã đọc văn bản DOCX; không lấy hình ảnh hoặc bố cục.'
    else: raise ValueError('Định dạng không được hỗ trợ.')
    if not text.strip(): raise ValueError('Không có lớp văn bản. Với tài liệu scan, hãy chọn ảnh chụp để AI local đọc.')
    truncated=len(text)>50000
    print(json.dumps({'text':text[:50000],'note':note,'truncated':truncated},ensure_ascii=False))
except Exception as error:
    print(json.dumps({'error':str(error)},ensure_ascii=False));sys.exit(1)
