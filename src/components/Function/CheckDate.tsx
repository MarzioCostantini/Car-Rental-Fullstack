// CheckDates als Hilfsfunktion, ohne useContext direkt zu verwenden
export function checkDates(picDate: string, dropDate: string, formData: any): boolean {
    let date1 = new Date(picDate || "");
    let date2 = new Date(dropDate || "");

    let DifferenceInTime = date2.getTime() - date1.getTime();
    let DifferenceInDays = Math.round(DifferenceInTime / (1000 * 3600 * 24));

    // Checkt, ob das Abgabedatum vor dem Abholdatum liegt
    if (DifferenceInDays < 0 && formData) {
        alert("Drop-off date cannot be before the pick-up date -");
        formData.setFormData({
            ...formData.formData,
            dropOffDate: ""
        });
        return false;
    }

    // Mindestbuchungsdauer von 1 Tag prüfen
    if (DifferenceInDays === 0 && formData) {
        alert("The minimum booking duration must be one day! -");
        formData.setFormData({
            ...formData.formData,
            dropOffDate: ""
        });
        return false;
    }

    return true;
}
