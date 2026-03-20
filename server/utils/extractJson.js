const extractJson = async(raw) => {
    if(!raw){
        return;
    }
    const cleaned = raw.replace(/```json/gi,"").replace(/```/g,"").trim();
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");
    if(firstBrace === -1 || lastBrace === -1 || firstBrace > lastBrace){
        return null;
    }
    const jsonString = cleaned.slice(firstBrace, lastBrace + 1);
    return JSON.parse(jsonString);
}

export default extractJson;