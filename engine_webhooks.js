// do_post_listener.gs
// Target: sol_savage_msi_ledger.csv

function doPost(e) {
  try {
      const sheetName = "sol_savage_msi_ledger"; // Ensure Sheet tab matches lowercase_underscore
          const ss = SpreadsheetApp.getActiveSpreadsheet();
              let sheet = ss.getSheetByName(sheetName);
                  
                      // Create sheet if it does not exist
                          if (!sheet) {
                                sheet = ss.insertSheet(sheetName);
                                    }

                                        const data = JSON.parse(e.postData.contents);
                                            const timestamp = new Date().toISOString();
                                                
                                                    // Map incoming payload to MSI 116-column logic
                                                        // [Timestamp, SKU, MFR, MPN, Condition, Flux, OCR_Raw]
                                                            sheet.appendRow([
                                                                  timestamp, 
                                                                        data.sku || "", 
                                                                              data.mfr || "", 
                                                                                    data.mpn || "", 
                                                                                          data.cond || "", 
                                                                                                data.flux || "", 
                                                                                                      data.ocr_raw || ""
                                                                                                          ]);

                                                                                                              return ContentService.createTextOutput(JSON.stringify({"status": "SUCCESS"}))
                                                                                                                    .setMimeType(ContentService.MimeType.JSON);
                                                                                                                          
                                                                                                                            } catch (err) {
                                                                                                                                return ContentService.createTextOutput(JSON.stringify({"status": "ERROR", "message": err.toString()}))
                                                                                                                                      .setMimeType(ContentService.MimeType.JSON);
                                                                                                                                        }
                                                                                                                                        }
                                                                                                                                        