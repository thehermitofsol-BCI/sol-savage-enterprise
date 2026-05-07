/**
 * SOL SAVAGE HARVESTER: CTO-Alpha Node
 * Version: 1.0.0 - GAS Native
 */

function doGet(e) {
  const response = {
    node: 'CTO-Alpha',
    status: 'Operational',
    timestamp: new Date().toISOString()
  };

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

// Keep a doPost version in case your engine sends data here
function doPost(e) {
  return doGet(e);
}