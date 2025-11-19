import React, { useState, useEffect } from 'react';
import { UserService } from '../../services';
import './HistoryModule.css';

interface HistoryModuleProps {
    userId: string;
}

export const HistoryModule: React.FC<HistoryModuleProps> = ({ userId }) => {
    const [history, setHistory] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    useEffect(() => {
        const loadHistory = async () => {
            setIsLoading(true);
            try {
                const userService = UserService.getInstance();
                const userHistory = await userService.getHistory(userId);
                setHistory(userHistory);
            } catch (error) {
                console.error('Failed to load history:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadHistory();
    }, [userId]);

    const handleDelete = async (historyId: string) => {
        if (window.confirm('Are you sure you want to delete this history item?')) {
            try {
                const userService = UserService.getInstance();
                await userService.deleteHistoryItem(userId, historyId);
                setHistory(history.filter(item => item.id !== historyId));
                setOpenMenuId(null);
            } catch (error) {
                console.error('Failed to delete history item:', error);
                alert('Failed to delete item');
            }
        }
    };

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString() + ' ' + new Date(dateString).toLocaleTimeString();
        } catch (e) {
            return dateString;
        }
    };

    const renderFormattedText = (text: string) => {
        if (!text) return null;
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            return <span key={index}>{part}</span>;
        });
    };

    return (
        <div className="history-module">
            <div className="history-header">
                <h2>📜 Learning History</h2>
                <p>Review your past exercises and practice</p>
            </div>

            {isLoading ? (
                <div className="loading-state">Loading history...</div>
            ) : history.length === 0 ? (
                <div className="empty-state">
                    <p>No history found. Start practicing to track your progress!</p>
                </div>
            ) : (
                <div className="history-list">
                    {history.map((item) => (
                        <div
                            key={item.id}
                            className="history-card"
                            onMouseLeave={() => setOpenMenuId(null)}
                        >
                            <div className="history-meta">
                                <div className="meta-left">
                                    <span className={`history-type ${item.type}`}>{item.type === 'mistake' ? '❌ Mistake' : '✅ Practice'}</span>
                                    <span className="history-date">{formatDate(item.createdAt)}</span>
                                </div>
                                <div className="menu-container">
                                    <button
                                        className="menu-btn"
                                        onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                                        title="Options"
                                    >
                                        ⋮
                                    </button>
                                    {openMenuId === item.id && (
                                        <div className="menu-dropdown">
                                            <button onClick={() => handleDelete(item.id)}>
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="history-content">
                                <div className="question-row">
                                    <strong>Question:</strong>
                                    <p>{item.question}</p>
                                </div>

                                {item.type === 'practice' && item.isCorrect ? (
                                    <div className="practice-success">
                                        <div className="success-message">
                                            ✅ You answered correctly: <strong>{item.userAnswer}</strong>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="answer-row">
                                        <div className="user-answer">
                                            <strong>Your Answer:</strong>
                                            <p className="incorrect">{item.userAnswer}</p>
                                        </div>
                                        <div className="correct-answer">
                                            <strong>Correct Answer:</strong>
                                            <p className="correct">{item.correctAnswer}</p>
                                        </div>
                                    </div>
                                )}

                                {item.analysis && (
                                    <div className="analysis-row">
                                        <strong>Analysis:</strong>
                                        <div className="analysis-text">
                                            {item.analysis.analysis && <p>{renderFormattedText(item.analysis.analysis)}</p>}
                                            {item.analysis.suggestions && (
                                                <div className="suggestion-box">
                                                    <em>Suggestion:</em> {renderFormattedText(item.analysis.suggestions)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
