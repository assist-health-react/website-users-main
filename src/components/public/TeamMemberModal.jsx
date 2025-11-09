import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Linkedin, X } from 'lucide-react';

const TeamMemberModal = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {member.name}
              </DialogTitle>
              <DialogDescription className="text-brand-blue font-medium mt-1">
                {member.role}
              </DialogDescription>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </DialogHeader>
        <div className="mt-6">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <img
              src={member.image}
              alt={member.name}
              className="w-full md:w-48 h-48 rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="text-gray-600 whitespace-pre-line">
                {member.fullBio}
              </p>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-brand-blue hover:text-brand-blue/80 transition-colors"
            >
              <Linkedin className="w-5 h-5 mr-2" />
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

TeamMemberModal.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    fullBio: PropTypes.string.isRequired,
    linkedin: PropTypes.string.isRequired
  }),
  onClose: PropTypes.func.isRequired
};

export default TeamMemberModal; 