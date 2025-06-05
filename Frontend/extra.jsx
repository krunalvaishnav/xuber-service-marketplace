  {/* pending */}
                <div
                  className={`${styles.statusStep} ${
                    ["PENDING", "ACCEPTED", "STARTED", "COMPLETED"].includes(
                      selectedRequest.status
                    )
                      ? styles.active
                      : ""
                  }`}
                >
                  <div className={styles.stepConnector}></div>
                  <div className={styles.stepDot}></div>
                  <div className={styles.stepLabel}>
                    {selectedRequest.status === "PENDING"
                      ? "Awaiting Provider"
                      : "Accepted"}
                  </div>
                </div>

                {/* Started */}
                <div
                  className={`${styles.statusStep} ${
                    selectedRequest.started_at ||
                    ["STARTED", "COMPLETED"].includes(selectedRequest.status)
                      ? styles.active
                      : ""
                  }`}
                >
                  <div className={styles.stepConnector}></div>
                  <div className={styles.stepDot}></div>
                  <div className={styles.stepLabel}>Started</div>
                </div>

                {/* Completed */}
                <div
                  className={`${styles.statusStep} ${
                    selectedRequest.status === "COMPLETED" ? styles.active : ""
                  }`}
                >
                  <div className={styles.stepConnector}></div>
                  <div className={styles.stepDot}></div>
                  <div className={styles.stepLabel}>Completed</div>
                </div>