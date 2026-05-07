#!/data/data/com.termux/files/usr/bin/bash

# 1. PARAMETER INJECTION
# Sourcing the env file from the logic core root
ENV_FILE="$HOME/sol_savage_enterprise/sol_savage_engine/configuration_environment_variables.env"

if [ -f "$ENV_FILE" ]; then
    source "$ENV_FILE"
else
    echo "[!] CRITICAL: Environment file missing at $ENV_FILE"
    exit 1
fi

# 2. NULL SAFETY CHECK
# Ensures the handshake doesn't fire if the endpoint is empty
if [ -z "$MSI_ENDPOINT" ]; then
    echo "[!] ERROR: MSI_ENDPOINT is null. Check your .env file."
    exit 1
fi

echo "[*] RESONANCE ESTABLISHED: 10.00 Hz"
echo "[*] TARGET: $MSI_ENDPOINT"

# 3. THE HEARTBEAT LOOP
while true; do
    # Capture Magnetometer Z-Flux (Simulated or via Termux-API)
    # Using 'date' as a placeholder for entropy if API is busy
    TIMESTAMP=$(date +%s)
    
    echo "[Pulse] Sending Entropy Delta at $TIMESTAMP..."

    # THE NEURAL HANDSHAKE (CURL)
    # Quotes around variables prevent the 'null' operator error
    RESPONSE=$(curl -s -L "$MSI_ENDPOINT?query=heartbeat&timestamp=$TIMESTAMP")

    if [ -z "$RESPONSE" ]; then
        echo "[!] Handshake Failed: No response from Cloud Node."
    else
        echo "[√] Cloud Response: $RESPONSE"
    fi

    # 10.00 Hz Frequency (0.1s interval)
    sleep 0.1
done
